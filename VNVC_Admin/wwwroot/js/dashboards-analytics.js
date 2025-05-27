/**
 * Dashboard Analytics
 */

'use strict';

(function () {
  let cardColor, headingColor, axisColor, shadeColor, borderColor;

  cardColor = config.colors.white;
  headingColor = config.colors.headingColor;
  axisColor = config.colors.axisColor;
  borderColor = config.colors.borderColor;

  // Total Revenue Report Chart - Bar Chart
  // --------------------------------------------------------------------
        document.addEventListener('DOMContentLoaded', function () {
        // Dữ liệu tĩnh cho 12 tháng
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const vaccineSold = [150, 180, 200, 160, 220, 190, 210, 170, 200, 230, 250, 270]; // Số lượng vắc xin bán được
        const revenue = [500000, 600000, 700000, 550000, 800000, 650000, 750000, 600000, 700000, 850000, 900000, 950000]; // Doanh thu (VNĐ)

        // Lấy context của canvas
        const ctx = document.getElementById('salesChart').getContext('2d');
        if (!ctx) {
            console.error('Canvas element with id "salesChart" not found!');
        return;
        }

        // Vẽ biểu đồ
        new Chart(ctx, {
            type: 'bar', // Sử dụng bar làm mặc định
        data: {
            labels: labels,
        datasets: [
        {
            label: 'Số lượng Vaccine bán được',
        data: vaccineSold,
        backgroundColor: 'rgb(241, 147, 115)', // Tím nhạt
        borderColor: 'rgb(241, 147, 115)',
        borderWidth: 1,
        barPercentage: 0.5, // Rộng cột
        categoryPercentage: 0.8,
        yAxisID: 'y' // Trục y bên trái cho số lượng
                    },
        {
            type: 'line', // Sử dụng line cho doanh thu
        label: 'Doanh thu (VNĐ)',
        data: revenue,
        borderColor: 'rgba(255, 206, 86, 1)', // Vàng
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: false,
        tension: 0.4, // Đường cong mượt mà
        pointRadius: 5,
        pointBackgroundColor: 'rgba(255, 206, 86, 1)',
        yAxisID: 'y1' // Trục y bên phải cho doanh thu
                    }
        ]
            },
        options: {
            scales: {
            y: {
            beginAtZero: true,
        position: 'left',
        title: {
            display: true,
        text: 'Số lượng Vaccine',
        font: {
            size: 16
                            }
                        },
        ticks: {
            stepSize: 50 // Bước nhảy cho số lượng
                        }
                    },
        y1: {
            beginAtZero: true,
        position: 'right',
        title: {
            display: true,
        text: 'Doanh thu (VNĐ)',
        font: {
            size: 16
                            }
                        },
        ticks: {
            callback: function (value) {
                                return value.toLocaleString('vi-VN') + ' VNĐ';
                            }
                        },
        grid: {
            drawOnChartArea: false // Không vẽ lưới cho trục này để tránh chồng lấn
                        }
                    },
        x: {
            title: {
            display: true,
        text: 'Tháng',
        font: {
            size: 16
                            }
                        }
                    }
                },
        plugins: {
            legend: {
            labels: {
            font: {
            size: 14
                            }
                        }
                    },
        tooltip: {
            callbacks: {
            label: function (context) {
                                if (context.dataset.label === 'Số lượng Vaccine bán được') {
                                    return context.dataset.label + ': ' + context.parsed.y;
                                } else {
                                    return context.dataset.label + ': ' + context.parsed.y.toLocaleString('vi-VN') + ' VNĐ';
                                }
                            }
                        }
                    }
                }
            }
        });
    });

  // Appointment completion rate - Char
  // --------------------------------------------------------------------
        const completionRate = 90;

        const completionRateData = {
            datasets: [{
            data: [completionRate, 100 - completionRate],
        backgroundColor: ['#3b82f6', '#e5e7eb'],
        borderWidth: 0,

        circumference: 360,
        rotation: 0         
            }]
        };

        new Chart(document.getElementById('completionRateChart'), {
            type: 'doughnut', // Đây đã là kiểu biểu đồ vòng tròn
        data: completionRateData,
        options: {
            responsive: true,
        aspectRatio: 1, // Thay đổi tỷ lệ khung hình thành 1:1 cho hình tròn hoàn hảo
        cutout: '80%',  // Kích thước của lỗ ở giữa
        plugins: {
            legend: {display: false }, // Ẩn chú giải
        tooltip: {enabled: false }, // Ẩn tooltip khi di chuột vào
                   
                },
            }
        });
  // Profit Report Line Chart
  // --------------------------------------------------------------------
  const profileReportChartEl = document.querySelector('#profileReportChart'),
    profileReportChartConfig = {
      chart: {
        height: 80,
        // width: 175,
        type: 'line',
        toolbar: {
          show: false
        },
        dropShadow: {
          enabled: true,
          top: 10,
          left: 5,
          blur: 3,
          color: config.colors.warning,
          opacity: 0.15
        },
        sparkline: {
          enabled: true
        }
      },
      grid: {
        show: false,
        padding: {
          right: 8
        }
      },
      colors: [config.colors.warning],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      series: [
        {
          data: [110, 270, 145, 245, 205, 285]
        }
      ],
      xaxis: {
        show: false,
        lines: {
          show: false
        },
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: false
      }
    };
  if (typeof profileReportChartEl !== undefined && profileReportChartEl !== null) {
    const profileReportChart = new ApexCharts(profileReportChartEl, profileReportChartConfig);
    profileReportChart.render();
  }

  // Order Statistics Chart
  // --------------------------------------------------------------------
  const chartOrderStatistics = document.querySelector('#orderStatisticsChart'),
    orderChartConfig = {
      chart: {
        height: 165,
        width: 130,
        type: 'donut'
      },
      labels: ['Electronic', 'Sports', 'Decor', 'Fashion'],
      series: [85, 15, 50, 50],
      colors: [config.colors.primary, config.colors.secondary, config.colors.info, config.colors.success],
      stroke: {
        width: 5,
        colors: cardColor
      },
      dataLabels: {
        enabled: false,
        formatter: function (val, opt) {
          return parseInt(val) + '%';
        }
      },
      legend: {
        show: false
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          right: 15
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                fontSize: '1.5rem',
                fontFamily: 'Public Sans',
                color: headingColor,
                offsetY: -15,
                formatter: function (val) {
                  return parseInt(val) + '%';
                }
              },
              name: {
                offsetY: 20,
                fontFamily: 'Public Sans'
              },
              total: {
                show: true,
                fontSize: '0.8125rem',
                color: axisColor,
                label: 'Weekly',
                formatter: function (w) {
                  return '38%';
                }
              }
            }
          }
        }
      }
    };
  if (typeof chartOrderStatistics !== undefined && chartOrderStatistics !== null) {
    const statisticsChart = new ApexCharts(chartOrderStatistics, orderChartConfig);
    statisticsChart.render();
  }

  // Income Chart - Area chart
  // --------------------------------------------------------------------
  const incomeChartEl = document.querySelector('#incomeChart'),
    incomeChartConfig = {
      series: [
        {
          data: [24, 21, 30, 22, 42, 26, 35, 29]
        }
      ],
      chart: {
        height: 215,
        parentHeightOffset: 0,
        parentWidthOffset: 0,
        toolbar: {
          show: false
        },
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      legend: {
        show: false
      },
      markers: {
        size: 6,
        colors: 'transparent',
        strokeColors: 'transparent',
        strokeWidth: 4,
        discrete: [
          {
            fillColor: config.colors.white,
            seriesIndex: 0,
            dataPointIndex: 7,
            strokeColor: config.colors.primary,
            strokeWidth: 2,
            size: 6,
            radius: 8
          }
        ],
        hover: {
          size: 7
        }
      },
      colors: [config.colors.primary],
      fill: {
        type: 'gradient',
        gradient: {
          shade: shadeColor,
          shadeIntensity: 0.6,
          opacityFrom: 0.5,
          opacityTo: 0.25,
          stops: [0, 95, 100]
        }
      },
      grid: {
        borderColor: borderColor,
        strokeDashArray: 3,
        padding: {
          top: -20,
          bottom: -8,
          left: -10,
          right: 8
        }
      },
      xaxis: {
        categories: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          style: {
            fontSize: '13px',
            colors: axisColor
          }
        }
      },
      yaxis: {
        labels: {
          show: false
        },
        min: 10,
        max: 50,
        tickAmount: 4
      }
    };
  if (typeof incomeChartEl !== undefined && incomeChartEl !== null) {
    const incomeChart = new ApexCharts(incomeChartEl, incomeChartConfig);
    incomeChart.render();
  }

  // Expenses Mini Chart - Radial Chart
  // --------------------------------------------------------------------
  const weeklyExpensesEl = document.querySelector('#expensesOfWeek'),
    weeklyExpensesConfig = {
      series: [65],
      chart: {
        width: 60,
        height: 60,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          strokeWidth: '8',
          hollow: {
            margin: 2,
            size: '45%'
          },
          track: {
            strokeWidth: '50%',
            background: borderColor
          },
          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              formatter: function (val) {
                return '$' + parseInt(val);
              },
              offsetY: 5,
              color: '#697a8d',
              fontSize: '13px',
              show: true
            }
          }
        }
      },
      fill: {
        type: 'solid',
        colors: config.colors.primary
      },
      stroke: {
        lineCap: 'round'
      },
      grid: {
        padding: {
          top: -10,
          bottom: -15,
          left: -10,
          right: -10
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    };
  if (typeof weeklyExpensesEl !== undefined && weeklyExpensesEl !== null) {
    const weeklyExpenses = new ApexCharts(weeklyExpensesEl, weeklyExpensesConfig);
    weeklyExpenses.render();
  }
})();
