import * as messages from 'src/assets/message-bundle/message.json';

export class Notification {

    public read = true;
    public deleted = true;
    public text: string;
    public time: string;

    constructor(
        public id: string,
        public from: string,
        public msg: string,
        public t: string
    ) {
        this.text = this.getTextMessage(msg);
        this.time = this.transformDateForm(t);
    }

    public setRead(status) {
        this.read = status;
    }

    public setDeleted(status) {
        this.deleted = status;
    }

    private getTextMessage(msg: string) {
        return (<any>messages).default[msg.split('_')[0]][msg];
    }

    private transformDateForm(epochTime) {
        const date = new Date(0);
        date.setUTCSeconds(Number(epochTime));
        const day = (date.getDate() < 10) ? `0${date.getDate() + 1}` : date.getDate() + 1;
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${day}/${month}/${date.getFullYear()}`;
    }


}
