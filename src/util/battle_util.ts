
// 공격 범위
import {Unit} from "../instance/unit";

export enum TARGET_ARRANGE
{
    SINGLE,
    ALL
}

export enum SKILL_TYPE
{
    ACTIVE,
    PASSIVE
}

export enum CS_TYPE
{
    BUF,
    DEBUF
}

// 적용되는 시점.
export enum CS_TIMING
{
    ATTACK_BEFORE,
    ATTACK_AFTER,
}

export function FindUnitByUID( uid : number, units : Unit[] ) : Unit | null
{
    for ( let unit of units )
    {
        if (unit.GetUID() == uid)
        {
            return unit;
        }
    }

    return null;  // 못 찾음,.
}