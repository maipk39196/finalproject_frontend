document.addEventListener("DOMContentLoaded", function() {
    // ตั้งค่าวันที่ปัจจุบันใน datePicker
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const currentDate = `${year}-${month}-${day}`;
    document.getElementById('startDate').value = currentDate;
    document.getElementById('endDate').value = currentDate;

    // ข้อมูลยอดขายในช่วง 10 วันที่ผ่านมา
    const salesData = {
        labels: ['10 วันที่แล้ว', '9 วันที่แล้ว', '8 วันที่แล้ว', '7 วันที่แล้ว', '6 วันที่แล้ว', '5 วันที่แล้ว', '4 วันที่แล้ว', '3 วันที่แล้ว', '2 วันที่แล้ว', 'เมื่อวานนี้'],
        datasets: [{
            label: 'ยอดขายรวม (บาท)',
            data: [1200, 1500, 1800, 2000, 1300, 1700, 2100, 2500, 1900, 2200],  // ข้อมูลยอดขาย
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // กราฟแท่งของยอดขาย
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
        type: 'bar', // ชนิดของกราฟแท่ง
        data: salesData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 25 // ขนาดฟอนต์ของแกน Y
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 25 // ขนาดฟอนต์ของแกน X
                        }
                    }
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'end', // ตำแหน่งของตัวเลขบนแท่ง
                    align: 'end',  // จัดตำแหน่งตัวเลขให้อยู่บนแท่ง
                    color: '#000', // สีของตัวเลข
                    font: {
                        size: 35, // ปรับขนาดฟอนต์ของตัวเลขบนแท่งกราฟ
                        weight: 'bold'
                    }
                },
                legend: {
                    labels: {
                        font: {
                            size: 25 // ขนาดฟอนต์ของ Legend (ป้ายกำกับ)
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            onClick: function(event) {
                const elements = salesChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
                if (elements.length) {
                    // เลื่อนหน้าไปยังตารางเมื่อคลิกที่แท่งกราฟ
                    document.getElementById('reportTable').scrollIntoView({
                        behavior: 'smooth', // เลื่อนอย่างนุ่มนวล
                        block: 'start' // เลื่อนให้ตารางอยู่ที่ด้านบนของหน้าจอ
                    });
                }
            }
        },
        plugins: [ChartDataLabels] // ใช้ ChartDataLabels plugin
    });

    // ฟังก์ชันเลื่อนกลับไปที่กราฟ
    document.getElementById('scrollToChart').addEventListener('click', function() {
        document.getElementById('salesChart').scrollIntoView({
            behavior: 'smooth', // เลื่อนอย่างนุ่มนวล
            block: 'start' // เลื่อนให้กราฟอยู่ที่ด้านบนของหน้าจอ
        });
    });

    // ฟังก์ชันคำนวณราคารวมในตาราง
    function calculateTotal() {
        let total = 0;
        const prices = document.querySelectorAll('#reportTable tbody td:last-child');
        prices.forEach(price => {
            total += parseFloat(price.textContent) || 0;
        });
        document.getElementById('totalPrice').textContent = total.toFixed(2); // แสดงผลในรูปแบบตัวเลขทศนิยม 2 ตำแหน่ง
    }

    // เรียกใช้ฟังก์ชันคำนวณราคารวม
    calculateTotal();
});
