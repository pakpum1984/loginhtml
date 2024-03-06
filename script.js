// document.addEventListener('DOMContentLoaded', function() {

//   fetchData(formData); // เรียกใช้งาน fetchData() เมื่อหน้าเว็บโหลดเสร็จสมบูรณ์
// });


  document.addEventListener('DOMContentLoaded', function() {
      var storedStatus = localStorage.getItem('status');
      var storedFname = localStorage.getItem('fname');
      var storedDep = localStorage.getItem('dep');

      if (storedStatus === 'admin' && storedFname && storedDep) {
          // ตรวจสอบว่าข้อมูลถูกเก็บไว้ใน Local Storage แล้ว
          Swal.fire({
              position: 'center',
              icon: 'info',
              title: '<h4>ยินดีต้อนรับกลับ<br>คุณ ' + storedFname +'</h4>',
              showConfirmButton: true,
              confirmButtonText: 'ปิด',
          });

          $('#page1').hide();
          $('#page2').show();
        $('#namebook').val(storedFname);
        $('#namedep').val(storedDep);
      }
  });

  function clearForm() {
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
  }

  function submitForm() {
      event.preventDefault();
      Swal.fire({
          position: 'center',
          title: '<h4>กำลังตรวจสอบข้อมูล...</h4>',
          showConfirmButton: false,
      });
      Swal.showLoading();
      var formData = new FormData();
      formData.append('username', document.getElementById('username').value);
      formData.append('password', document.getElementById('password').value);
    //   fetchData(formData); // เรียกใช้งานฟังก์ชัน fetchData() และส่งข้อมูลไปด้วย

    // }

    // function fetchData(formData) {
      fetch('https://script.google.com/macros/s/AKfycbypjGKYQbbGFJqla3TosdHghZZ1uZIEiQDUPT3hSQBABAT1ryb2PNF9GNoRcsGVZW_X/exec', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          if (response.ok) {
              return response.json(); // Convert the response to JSON
          } else {
              throw new Error('An error occurred while sending the data');
          }
      })
      .then(data => {
          if (data !== false) { // ตรวจสอบค่าที่ส่งกลับมาว่าไม่ใช่ 'false'
              var username = data.username;
              var password = data.password;
              var fname = data.name;
              var dep = data.dep;
              var status = data.status;

              if (status === 'admin') {
                  localStorage.setItem('status', status);
                  localStorage.setItem('fname', fname);
                  localStorage.setItem('dep', dep);

                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: '<h4>ยินดีต้อนรับ<br>คุณ ' + fname +'</h4>',
                      showConfirmButton: true,
                      confirmButtonText: 'กดปิด',
                  });

                  $('#page1').hide();
                  $('#page2').show();
                  $('#namebook').val(fname);
                 $('#namedep').val(dep);
              }
          } else {
              Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: '<h4>ไม่พบข้อมูลที่ท่านกรอกในระบบ</h4>',
                  showConfirmButton: true,
                  confirmButtonText: 'กดปิด',
              });
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }

  function logout() {
      Swal.fire({
          title: 'คุณต้องการออกจากระบบหรือไม่?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ต้องการ!',
          cancelButtonText: 'ยกเลิก'
      }).then((result) => {
          if (result.isConfirmed) {
              document.getElementById('page2').style.display = 'none';
              document.getElementById('page1').style.display = 'block';
              localStorage.clear();
          }
      });
  }
