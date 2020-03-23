import {Unit} from '../instance/unit';
import {TARGET_ARRANGE} from "../util/battle_util";
import {Hash} from "crypto";
import {SkillInstance} from "../instance/skill";
import {Skill} from "../models/skill";
import {CSInstance} from "../instance/cs";

export class DiceResult
{
    uid : number;
    dice_list : number[];

    constructor( uid : number )
    {
        this.uid = uid;
        this.dice_list = [];
    }
}

export class AttackResult
{
    // 실패 사유
    is_invalid? : boolean;
    invalid_cause? : string;

    is_skill : boolean = false;
    skill_name : string = "";
    skill_id : number = -1;

    targets : number[] = []; // UID들.
    damages : Map<number, number> = new Map<number, number>(); // UID에 따른 damage 계수들.
    dead : Map<number, number> = new Map<number, number>(); // UID에 따른 사망자 리스트.

    // 다이스 결과들.
    invoker_dice : Map<number, DiceResult> = new Map<number, DiceResult>(); // 공격자 다이스 리스트. targets 순서대로.
    targets_dice : Map<number, DiceResult> = new Map<number, DiceResult>(); // 처 맞는 사람 다이스 리스트. targets 순서대로.
}


export class UnitAction
{
    static GetTargets(  target_arrange : TARGET_ARRANGE, targets : Unit[], target? : Unit ) : Unit[] | null
    {
        let attack_targets : Unit[] = [];

        // 적군의 모든 걸 지정.
        if ( target_arrange == TARGET_ARRANGE.ALL )
        {
            for ( let unit of targets )
            {
                attack_targets.push( unit );
            }
        }
        else if ( target_arrange == TARGET_ARRANGE.SINGLE )
        {
            if ( target == null )
            {
                return null;
            }

            for ( let unit of targets )
            {
                if ( unit.GetUID() == target.GetUID() )
                {
                    attack_targets.push( unit );
                    break;
                }
            }
        }
        else
        {
            console.log( " SOMETHING WAS WRONG ");
            return null;
        }

        return attack_targets
    }

    static ProcAttackEachUnits( attacker : Unit, attack_target_units : Unit[] ) : AttackResult
    {
        let result : AttackResult = new AttackResult();

        for ( let attack_target of attack_target_units )
        {
            let attacker_dice_result : DiceResult = new DiceResult( attacker.GetUID() );
            let target_dice_result : DiceResult = new DiceResult( attack_target.GetUID() );

            let attacker_dmg = 0; // 공격자가 처 맞은거
            let target_dmg = 0;  // 타겟이 처 맞은 거

            while( true )
            {
                let  attacker_dice = attacker.ProcDice();
                let  target_dice = attack_target.ProcDice();

                attacker_dice_result.dice_list.push( attacker_dice );
                target_dice_result.dice_list.push( target_dice );

                if ( attacker_dice == target_dice )
                {
                    continue;
                }

                if ( attacker_dice > target_dice ) //  공격 성공
                {
                    target_dmg = attack_target.DecHp( attacker.GetDamage() );
                }
                else if( attacker_dice < target_dice && attacker.CounterAble() ) // 공격 실패인데, 반격 가능.
                {
                    attacker_dmg = attacker.DecHp( attack_target.GetDamage() );
                }

                break; // 평타 종료.
            }

            result.invoker_dice.set( attack_target.GetUID(), attacker_dice_result );
            result.targets_dice.set( attack_target.GetUID(), target_dice_result );

            result.damages.set( attack_target.GetUID(), target_dmg );
            result.damages.set( attacker.GetUID(), attacker_dmg );
        }

        return result;
    }

    static ProcSkillEachUnits( attacker : Unit, attack_skill : SkillInstance, attack_target_units : Unit[] ) : AttackResult
    {
        let result : AttackResult = new AttackResult();

        for ( let attack_target of attack_target_units )
        {
            let add_cs = attack_skill.CopyCS();

            if ( add_cs != null )
            {
                attack_target.AddCS( <CSInstance>(add_cs) );

            }

            let dmg = attack_target.DecHp( attack_skill.damage );
            result.damages.set( attack_target.GetUID(), dmg );
        }

        return result;
    }

    static GetTargetUIDs( attack_target_units : Unit[] ) : number[]
    {
        let uids : number[] = [];

        for( let target_unit of  attack_target_units )
        {
            uids.push( target_unit.GetUID() );
        }

        return uids;
    }

    static IsFailedAttack( result : AttackResult, attack_targets : Unit[] | null ) : boolean
    {
        if( attack_targets == null || attack_targets.length == 0 )
        {
            result.is_invalid = true;
            result.invalid_cause = "TARGET WAS INVALID.";
            return true;
        }

        return false;
    }

    // 평타
    static AttackUnit( attacker : Unit, targets : Unit[], target : Unit ) : AttackResult
    {
        let result = new AttackResult();
        let attack_targets : Unit[] | null = this.GetTargets( TARGET_ARRANGE.SINGLE, targets, target );

        if( this.IsFailedAttack( result, attack_targets ) )
        {
            return result;
        }

        let attack_target_units = <Unit[]>( attack_targets );

        result = this.ProcAttackEachUnits( attacker, attack_target_units );
        result.targets = this.GetTargetUIDs( attack_target_units );

        return result;
    }


    static AttackUnitBySkill(  attacker : Unit, attack_skill : SkillInstance, targets : Unit[], target? : Unit ) : AttackResult
    {
        let result = new AttackResult();

        if ( !attack_skill.CheckResource( attacker ) )
        {
            result.is_invalid = true;
            result.invalid_cause = "NOT HAVE RESOURCE";
            return result;
        }

        let attack_targets : Unit[] | null = this.GetTargets( attack_skill.GetTargetArrange(), targets, target );

        if( this.IsFailedAttack( result, attack_targets ) )
        {
            return result;
        }

        let attack_target_units = <Unit[]>( attack_targets );
        result = this.ProcSkillEachUnits( attacker, attack_skill, attack_target_units );

        attack_skill.UseSkill();

        result.is_skill = true;
        result.skill_id = attack_skill.skill_id;
        result.skill_name = attack_skill.skill_name;


        return result;
    }


}