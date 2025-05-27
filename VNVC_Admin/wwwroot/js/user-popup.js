function showDeleteConfirmation(event, userName) {
    event.preventDefault();
    const deleteUrl = event.currentTarget.getAttribute('href');

    Swal.fire({
        title: 'Xác nhận xóa',
        html: `Bạn có chắc muốn xóa người dùng <b>${userName}</b>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        reverseButtons: true,
        focusCancel: true,
        customClass: {
            popup: 'animated bounceIn'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = deleteUrl;
        }
    });
}