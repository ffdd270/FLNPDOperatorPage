import SocketIO from "socket.io";
import {Unit} from "../instance/unit";
import {UnitResponse} from "../util/response";

export class BattleSocket
{
    static SetSocket( io : SocketIO.Server )
    {
        this.io = io;
    }

    static BroadcastingUnits( units : UnitResponse[] )
    {
        this.io.emit('units', units );
    }

    static BroadcastingAddUnit( unit : UnitResponse )
    {
        this.io.emit( 'added unit', unit );
    }

    private static io : SocketIO.Server;
}