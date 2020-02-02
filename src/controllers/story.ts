import {Story} from "../models/story";
import {User} from "../models/user";


export class StoryController
{
    // name 중복 금지.
    static async AddStory( user_model : User, name : string, desc : string ) : Promise<Story | boolean>
    {
        // 어드민 아니면 스토리 생성 금지.
        if ( user_model.permission != "ADMIN" )
        {
            return false;
        }

        let story_exist = await this.FindStory( name );

        if ( story_exist != false )
        {
            return false;
        }
        
        let id : number = await Story.count();
        let new_story = await new Story( { id: id, name: name, desc: desc } )
        await new_story.save();

        return new_story;
    }

    static async FindStory( name : string ) : Promise<Story | boolean>
    {
        let story : Story | null = await Story.findOne( { where : { name: name } } );

        if ( story == null )
        {
            return false;
        }

        return story;
    }

    static async FindStoryById( id : number ) : Promise<Story | boolean>
    {
        let story : Story | null = await Story.findOne( { where : { id: id } } );

        if ( story == null )
        {
            return false;
        }

        return story;
    }


}
