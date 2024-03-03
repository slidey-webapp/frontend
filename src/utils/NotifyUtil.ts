import { toast } from 'react-toastify';
import swal from 'sweetalert2';

export default class NotifyUtil {
    static confirmDialog(title: string, description?: string) {
        return swal.fire({
            title,
            text: description,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Từ chối',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
        });
    }

    static success(message: string) {
        toast.success(message);
    }

    static error(message: string) {
        toast.error(message);
    }

    static warn(message: string) {
        toast.warn(message);
    }

    static info(message: string) {
        toast.info(message);
    }
}
