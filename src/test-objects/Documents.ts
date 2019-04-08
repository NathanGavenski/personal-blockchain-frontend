import { ShareCN } from 'src/app/components/birth-certification/menu/view-birth/share.model';
import { User } from 'src/app/components/models/user';
import { Birth, SonsBirthCertificate } from 'src/app/components/models/birth';
import { General } from 'src/app/components/models/general';
import { SharedRG } from 'src/app/components/general-registry/menus/view-general/shared.model';

export const GeneralDoc: General = new General(
    'pai1', 'mae1', 'bra', 'cpf1', 'pis1',
    'cas1', 'userPhoto', '1543104000', true
);

export function getSharedGeneralDoc(): SharedRG[] {
    const shared = new SharedRG(GeneralDoc);
    shared.setNames(new User('', '', 'Luiz', 'Vieira'));
    return [shared];
}

export const BirthDoc = new Birth(
    '01234567890', '769737600', 'HospitalDoLuiz',
    'CidadeDoLuiz', 'PaiDoLuiz', 'MaeDoLuiz',
    'AvoDoLuiz1', 'AvoDoLuiz1', 'AvoDoLuiz2',
    'AvoDoLuiz2', true, [], []
);

export const SonBirthDoc = new SonsBirthCertificate(
    '01234567890', 'teste', 'teste', '24/02/1993',
    'hospital', 'cidade', 'pai', 'mae', 'avo1',
    'avo2', 'avo3', 'avo4', true
);

export function getSharedBirthDoc(): ShareCN {
    const shared = new ShareCN(BirthDoc);
    shared.setNames(new User('', '', 'Luiz', 'Vieira'));
    return shared;
};