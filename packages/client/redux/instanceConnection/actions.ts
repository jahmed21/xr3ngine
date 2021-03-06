import {
  INSTANCE_SERVER_PROVISIONED,
  INSTANCE_SERVER_CONNECTED,
  INSTANCE_SERVER_DISCONNECTED,
  SOCKET_CREATED
} from '../actions';

import { InstanceServerProvisionResult } from '@xr3ngine/common/interfaces/InstanceServerProvisionResult';

export interface InstanceServerProvisionedAction {
  type: string;
  ipAddress: string;
  port: string;
  locationId: string;
}

export interface InstanceServerConnectedAction {
  type: string;
}

export interface InstanceServerDisconnectedAction {
  type: string;
}

export interface SocketCreatedAction {
  type: string;
  socket: any;
}

export type InstanceServerAction =
  InstanceServerProvisionedAction
  | InstanceServerConnectedAction
  | InstanceServerDisconnectedAction
  | SocketCreatedAction

export function instanceServerProvisioned (provisionResult: InstanceServerProvisionResult, locationId: string): InstanceServerProvisionedAction {
  return {
    type: INSTANCE_SERVER_PROVISIONED,
    ipAddress: provisionResult.ipAddress,
    port: provisionResult.port,
    locationId: locationId
  };
}
export function instanceServerConnected (): InstanceServerConnectedAction {
  return {
    type: INSTANCE_SERVER_CONNECTED
  };
}

export function instanceServerDisconnected (): InstanceServerDisconnectedAction {
  return {
    type: INSTANCE_SERVER_DISCONNECTED
  };
}

export function socketCreated(socket: any): SocketCreatedAction {
  return {
    type: SOCKET_CREATED,
    socket: socket
  };
}