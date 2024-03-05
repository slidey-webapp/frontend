import store from '~/AppStore';
import { Permission } from '~/configs/constants';

export class PermissionUtil {
    static checkPermission = (permissionKey: string): boolean => {
        const rights = store.getState()?.auth?.authUser?.claims || [];
        const isAdmin = rights.some(x => x === Permission.SystemAdmin);
        if (isAdmin) return true;
        return rights?.includes(permissionKey);
    };

    static checkMultiPermission = (permissionKeys?: string[]): boolean => {
        if (!permissionKeys || permissionKeys.length === 0) return true;

        const rights = store.getState()?.auth?.authUser?.claims || [];
        const isAdmin = rights.some(x => x === Permission.SystemAdmin);
        if (isAdmin) return true;
        return rights?.some((right: string) => permissionKeys.includes(right));
    };
}
