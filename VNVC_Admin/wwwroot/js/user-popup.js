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
            // Gửi yêu cầu xóa qua AJAX
            fetch(deleteUrl, {
                method: 'POST',
                headers: {
                    'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
                .then(response => {
                    if (!response.ok) throw new Error('Lỗi server');
                    return response.json();
                })
                .then(data => {
                    if (data.status === 'success') {
                        Swal.fire({
                            title: 'Thành công',
                            text: data.message || 'Người dùng đã được xóa thành công!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#3085d6',
                            customClass: {
                                popup: 'animated bounceIn'
                            }
                        }).then(() => {
                            // Chuyển hướng sau khi xóa thành công (tùy chọn)
                            window.location.href = '/Users'; // Thay đổi URL theo route của bạn
                        });
                    } else {
                        Swal.fire({
                            title: 'Lỗi',
                            text: data.message || 'Đã có lỗi xảy ra khi xóa.',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#d33',
                            customClass: {
                                popup: 'animated bounceIn'
                            }
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Lỗi',
                        text: 'Đã có lỗi xảy ra. Vui lòng kiểm tra kết nối và thử lại.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#d33',
                        customClass: {
                            popup: 'animated bounceIn'
                        }
                    });
                });
        }
    });
}