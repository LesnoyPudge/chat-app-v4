import * as c1 from './App';
import * as c2 from './Channels';
import * as c3 from './Conversations';
import * as c4 from './Messages';
import * as c5 from './Roles';
import * as c6 from './Servers';
import * as c7 from './TextChats';
import * as c8 from './Users';
import * as c9 from './VoiceChats';



export namespace Features {
    export import App = c1.App;

    export import Channels = c2.Channels;

    export import Conversations = c3.Conversations;

    export import Messages = c4.Messages;

    export import Roles = c5.Roles;

    export import Servers = c6.Servers;

    export import TextChats = c7.TextChats;

    export import Users = c8.Users;

    export import VoiceChats = c9.VoiceChats;
}