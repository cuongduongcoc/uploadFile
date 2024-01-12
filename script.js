document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const downloadBtn = document.getElementById('downloadBtn');
    const audioPlayer = document.getElementById('audioPlayer');

    fileInput.addEventListener('change', handleFileSelect);
    downloadBtn.addEventListener('click', handleDownload);

    function handleFileSelect() {
        const selectedFile = fileInput.files[0];

        if (selectedFile) {
            // Enable download button
            downloadBtn.disabled = false;

            // Set audio source
            const audioURL = URL.createObjectURL(selectedFile);
            audioPlayer.src = audioURL;
        } else {
            // Disable download button and reset audio source
            downloadBtn.disabled = true;
            audioPlayer.src = '';
        }
    }

    function handleDownload() {
        const selectedFile = fileInput.files[0];
        if (selectedFile) {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(selectedFile);
            downloadLink.download = selectedFile.name;
            downloadLink.click();
        }
    }
});

function convertAndUpload() {
  const fileInput = document.getElementById('fileInput');
  const selectedFile = fileInput.files[0];

  if (!selectedFile) {
    alert('Vui lòng chọn một file.');
    return;
  }

  const appToken = 'Bearer Your_App_Token';
  const appId = 'Your_App_ID';
  const voiceCode = 'hn_female_ngochuyen_full_48k-fhg';
  const audioType = 'mp3';
  const bitrate = '128';
  const speedRate = '1.0';

  // Đọc nội dung của file
  const reader = new FileReader();
  reader.onload = function(event) {
    const audioData = event.target.result.split(',')[1];

    // Tạo dữ liệu cho body của request
    const requestBody = {
      app_id: appId,
      audio_data: audioData,
      voice_code: voiceCode,
      audio_type: audioType,
      bitrate: bitrate,
      speed_rate: speedRate,
    };

    // Gửi request tới API Text-to-Speech
    axios.post('https://vbee.vn/api/v1/tts', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': appToken,
      },
    })
    .then(response => {
      // Xử lý kết quả từ server
      console.log('API Response:', response.data);
    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error('API Error:', error.response.data);
    });
  };

  // Đọc file như là một base64 encoded string
  reader.readAsDataURL(selectedFile);
}

function toggleElements() {
    var switchState = document.getElementById("toggleSwitch").checked;
  
    var fileInput = document.getElementById("dropcontainer");
    var textarea = document.getElementById("textarea");
  
    if (switchState) {
      fileInput.classList.remove("hidden");
      textarea.classList.add("hidden");
    } else {
      fileInput.classList.add("hidden");
      textarea.classList.remove("hidden");
    }
  }