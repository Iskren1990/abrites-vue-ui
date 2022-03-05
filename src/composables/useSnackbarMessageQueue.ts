import { Ref, ref } from "vue";

export interface SnackbarMessageModelProps {
  text: string;
  id?: string;
  action?: SnackbarAction;
  duration?: number;
}

type SnackbarMessageType =
  | SnackbarErrorMessage
  | SnackbarInfoMessage
  | SnackbarSuccessMessage
  | SnackbarWarningMessage;

class SnackbarMessageModel {
  _durationTimer?: number;
  isRemoving = false;
  text: string;
  id: string;
  action?: SnackbarAction;
  duration: number;

  constructor({
    text,
    id = text,
    action,
    duration = 3500,
  }: SnackbarMessageModelProps) {
    this.text = text;
    this.id = id;
    this.action = action;
    this.duration = duration;
  }

  startDurationTimer(callback: () => void): void {
    this.cancelDurationTimer();

    if (!this.duration) {
      return;
    }

    this._durationTimer = window.setTimeout(callback, this.duration);
  }

  cancelDurationTimer(): void {
    window.clearTimeout(this._durationTimer);
  }
}

export class SnackbarInfoMessage extends SnackbarMessageModel {
  type = SnackbarMessageTypeEnum.info;
}

export class SnackbarSuccessMessage extends SnackbarMessageModel {
  type = SnackbarMessageTypeEnum.success;
}

export class SnackbarWarningMessage extends SnackbarMessageModel {
  type = SnackbarMessageTypeEnum.warning;
}

export class SnackbarErrorMessage extends SnackbarMessageModel {
  type = SnackbarMessageTypeEnum.error;
}

export interface SnackbarAction {
  label: string;
  callback: (message: SnackbarMessageModel) => void;
}

export enum SnackbarMessageTypeEnum {
  invalidMessageType,
  success,
  error,
  warning,
  info,
}
// message queue
const messages: Ref<SnackbarMessageType[]> = ref([]);

const useSnackbarMessageQueue = () => {
  const _remove = (message: SnackbarMessageType): void => {
    message.cancelDurationTimer();
    const id = messages.value.findIndex((m) => m.id == message.id);
    messages.value.splice(id, 1);
  };

  const removeMessage = (id: string, withAnimation = true): void => {
    const message = messages.value.find((m) => m.id == id && !m.isRemoving);

    if (message == undefined) {
      return;
    }

    if (withAnimation) {
      message.isRemoving = true;
      window.setTimeout(() => _remove(message), 300);
    } else {
      _remove(message);
    }
  };
  const addMessage = (message: SnackbarMessageType) => {
    // remove duplicated message
    removeMessage(message.id, false);

    message.startDurationTimer(() => {
      removeMessage(message.id);
    });

    messages.value.push(message);
  };

  return { messages, addMessage, removeMessage };
};

export default useSnackbarMessageQueue;
