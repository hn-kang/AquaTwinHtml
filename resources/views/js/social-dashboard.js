'use strict'
$(document).ready(function () {
    /* calander picker */
    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#daterangeadminux span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
    }

    $('#daterangeadminux').daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left',
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
    $('#daterangeadminux').on('show.daterangepicker', function (ev, picker) {
        var thisdp = $('.daterangepicker');
        setTimeout(function () {
            thisdp.addClass('active');
        }, 100);
    });
    $('#daterangeadminux').on('hide.daterangepicker', function (ev, picker) {
        var thisdpc = $('.daterangepicker');
        thisdpc.removeClass('active');

    });
    var path = '../assets/img/background-part.png';
    $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../../assets/img/background-part.png" alt="" style="display:none"></div>')
    /* calander picker ends */

    /* calander picker */
    function cb(start, end) {
        $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
    }
    $('#daterangeadminux2').daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left',
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
    $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
        var thisdp = $('.daterangepicker');
        setTimeout(function () {
            thisdp.addClass('active');
        }, 100);
    });
    $('#daterangeadminux2').on('hide.daterangepicker', function (ev, picker) {
        var thisdpc = $('.daterangepicker');
        thisdpc.removeClass('active');

    });

    /* calander picker ends */

    $('body').find("a").on('click', function(event){
    	event.preventDefault();
    	return;
    });


//
//    setInterval(function () {
//        configareachart.data.datasets.forEach(function (dataset) {
//            dataset.data = dataset.data.map(function () {
//                return randomScalingFactor();
//            });
//
//        });
//        window.salesareachart.update();
//    }, 2100);

    /* summary box green circle */
    $('#circle-green').circleProgress({
        value: 1,
        size: 80,
        startAngle: -Math.PI * .5,
        fill: {
            gradient: ["#1FC96E", "#67e242"]
        }
    });
    
    /* summary box spark lines  */
    $("#summarysparklines").sparkline([5, 6, 7, 2, 0, 5, 6, 7, 6, 7, 6, 5, 4], {
        type: 'bar',
        height: '37',
        barWidth: 3,
        barColor: '#ffffff'
    });
    
    /* data Table */
    $('.datatable').DataTable({
        'responsive': true,
        'searching': false,
        "bLengthChange": false,
        "pageLength": 4,
        "order" : [[0, 'desc']],
        "columnDefs": [
        	{
	            "targets": 5,
	            "orderable": false
        	}
        ]
    });
    
    $('[id$="-chart"]').each(function(_i, _chart){
    	let _chartCanvasNm  = $(_chart).find('canvas').attr('id');
    	fncDrawChart(_chartCanvasNm)
    });
    
    fncDrawDoghnut();
    
    fncSearchSensorNow(); 
    
    //초기 세팅
    $('#LDO11002-tab').css('background-color','#F85778');
    $('#LDO11002-tab').find('.text-mute .mb-0').text('Warning');
});

const fncDrawDoghnut = () => {

	/* dognut chart */
	var configsalesdoghnut = {
	    type: 'doughnut',
	    data: {

	        datasets: [{
	            data: [
						20000,
						15000,
						1000
					],
	            backgroundColor: [
						'#5B92FF',
						'#1FC96E',
						'#F85778',
					],
	            label: 'Dataset 1'
				}],
	        labels: [
					'Red',
					'Orange',
					'Yellow',
				]
	    },
	    options: {
	        elements: {
	            arc: {
	                borderWidth: 0
	            }
	        },
	        cutoutPercentage: 80,
	        responsive: true,
	        legend: {
	            display: false,
	        },
	        title: {
	            display: false,
	            text: 'Chart.js Doughnut Chart'
	        },
	        animation: {
	            animateScale: true,
	            animateRotate: true
	        }
	    }
	};
	
    var salesdoghnutchart = document.getElementById('donughtchart').getContext('2d');
    window.salesDoughnutChart = new Chart(salesdoghnutchart, configsalesdoghnut);    
}



let _chart = {};

const fncDrawChart = (_chartCanvasNm) => {
	
    let _areachart = document.getElementById(_chartCanvasNm).getContext('2d');
    
    /* sales area chart */
    let gradient = _areachart.createLinearGradient(0, 0, 0, 450);
    
    //초기 세팅
    if(!_chartCanvasNm.includes('LDO11002')){
	    gradient.addColorStop(0.0, '#90b5ff');
	    gradient.addColorStop(0.9, 'rgba(152, 187, 255, 0)');
    }else{
		gradient.addColorStop(0.0, '#F85778');
		gradient.addColorStop(0.9, 'rgba(248,87,120,0)');    
    }
    
    let _configareachart = {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'My First dataset',
                    borderWidth: '1',
                    borderColor: 'rgba(144, 181, 255, 0)',
                    backgroundColor: gradient,
                    data: [],
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius: 0
                    }
                },
                title: {
                    display: false,
                    text: 'Chart.js Line Chart - Stacked Area'
                },
                tooltips: {
                    mode: 'index',
                },
                hover: {
                    mode: 'index'
                },
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            display: true,
                            fontColor: '#90b5ff',
                        },
                        scaleLabel: {
                            display: false
                        }
                        }],
                    yAxes: [{
                        ticks: fncChartYTicks(_chartCanvasNm),
//                        display: true,
//                        stacked: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        }
                        }]
                }
            }
        };

    _chart[_chartCanvasNm] = new Chart(_areachart, _configareachart);
}


const fncChartYTicks = (_chartCanvasNm) => {
	let _rtnYTicks = new Object();
	
	_rtnYTicks.display = true;
	_rtnYTicks.fontColor = '#90b5ff';
	
	console.log(_chartCanvasNm);
	
	if(_chartCanvasNm.includes('PH')){
		_rtnYTicks.min = 5;
		_rtnYTicks.max = 9;
	}else if(_chartCanvasNm.includes('TEMP')){
		_rtnYTicks.min = 15;
		_rtnYTicks.max = 28;		
	}else if(_chartCanvasNm.includes('DO')){
		_rtnYTicks.min = 6;
		_rtnYTicks.max = 16;		
	}/*else if(_chartCanvasNm.includes('COND')){
		_rtnYTicks.min = 20;
		_rtnYTicks.max = 36;		
	}*/
	
	return _rtnYTicks;
}

const fncSearchSensorNow = () => {

	$.ajax({
		url:'/main/sensorList',
		type:'POST',
		dataType:'JSON',
		cache:false,
		async:true,
		data:{},
		success: function(_jsonData){
			
			let _sensorNowList = _jsonData.sensorNowList;
			
			$(_sensorNowList).each(function(_i, _sensorNow){
				$(`#${_sensorNow.sensorType}${_sensorNow.serialCode}-tab`).children('h4').text(_sensorNow.value);
				$(`#${_sensorNow.sensorType}${_sensorNow.serialCode}-tab`).find('text-success').text(_sensorNow.unit);
				if(_sensorNow.sensorType == 'PH'){
					$(`#TEMP${_sensorNow.serialCode}-tab`).children('h4').text(_sensorNow.temperature);
				}
			});

			setTimeout(fncSearchSensorTimeList, 1000); 
		    
			setTimeout(fncSearchSensorNow, 5000);
		}
	});	
}

const fncSearchSensorTimeList = () => {

	$.ajax({
		url:'/main/sensorTimeList',
		type:'POST',
		dataType:'JSON',
		cache:false,
		async:true,
		data:{},
		success: function(_jsonData){
			
			
			let _sensorTimeList = _jsonData.sensorTimeList;
			let _chartObj, _sensorType, _serialCode, _serialValueArr = [], _serialLabelArr = [];
			$(_sensorTimeList).each(function(_i, _sensorTime){
				if(_sensorTime.groupNum == '1'){
					_sensorType = _sensorTime.sensorType;
					_serialCode = _sensorTime.serialCode;
					_serialValueArr = [];
					_chartObj = _chart[`mixedchartjs${_sensorType}${_serialCode}`];

				}
				
				_serialValueArr[Number(_sensorTime.groupNum)-1] = _sensorTime.value;
				_serialLabelArr[Number(_sensorTime.groupNum)-1] = _sensorTime.createdAt;

				if(_sensorTime.groupNum == 12){
					_chartObj.data.datasets[0].data = _serialValueArr;
					_chartObj.data.labels = _serialLabelArr;
					_chartObj.update();
				}
			});
			
			//TEMP
			$(_sensorTimeList).each(function(_i, _sensorTime){
				if(_sensorTime.sensorType == 'PH'){
					if(_sensorTime.groupNum == '1'){
						_sensorType = 'TEMP';
						_serialCode = _sensorTime.serialCode;
						_serialValueArr = [];
						_chartObj = _chart[`mixedchartjs${_sensorType}${_serialCode}`];
	
					}
					
					_serialValueArr[Number(_sensorTime.groupNum)-1] = _sensorTime.temperature;
					_serialLabelArr[Number(_sensorTime.groupNum)-1] = _sensorTime.createdAt;

					if(_sensorTime.groupNum == 12){
						_chartObj.data.datasets[0].data = _serialValueArr;
						_chartObj.data.labels = _serialLabelArr;
						_chartObj.update();
					}
				}
			});			
		}
	});	
} 


