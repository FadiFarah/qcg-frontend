import { environment } from "./environments/environment";

export class Limitations {
  public static MaxPlayers: number = 4;
  public static MinPlayers: number = 2;
  public static cardsInDeck: number = 36;
  public static cardsInHand: number = 4;
  public static categoryGroups: number = this.cardsInDeck / this.cardsInHand;
}

export class States {
  public static Main: string = "/";
  public static RoomsList: string = "/rooms-list";
  public static RoomCreation: string = "/room-creation";
  public static Category: string = "/category";
  public static RoomWait: string = "/room-wait";
  public static Game: string = "/game";
  public static Help: string = "/help";
  public static Profile: string = "/profile";
}

export class Endpoints {
  public static EndpointPrefix: string = environment.serverEndpointPrefix;
  public static SignalRRoomsListEndpointPrefix: string =
    environment.signalRRoomsListEndpointPrefix;
  public static SignalRGameEndpointPrefix: string =
    environment.signalRGameEndpointPrefix;

  public static Users: string = `${Endpoints.EndpointPrefix}/user`;
  public static UserById: string = `${Endpoints.EndpointPrefix}/user/{0}`;
  public static Rooms: string = `${Endpoints.EndpointPrefix}/room`;
  public static RoomById: string = `${Endpoints.EndpointPrefix}/room/{0}`;
  public static Category: string = `${Endpoints.EndpointPrefix}/category`;
}
