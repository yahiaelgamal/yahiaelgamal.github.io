var globalDataset;
var twoMerchDataset;
var datasetSub;
var globalMerchNames;
var merch_names;
var dataset;
var firstTime=true;
var selectedKey = 'Sum';

$('.select2').select2();

// Called after any change of merchants
var filterMerchants = function(){
  m1 = $('#merchant1').val();
  m2 = $('#merchant2').val();
  merch_names = [m1, m2];
  dataset = globalDataset.filter(function(d)
                                 { return d.tx_merchant_clean === m1 ||
                                   d.tx_merchant_clean === m2 });
}

// Called whenever the key (count, sum, avg, custeomrs) is changed
// updates `datasetSub`
var setupKey = function(selectedKey){
  datasetSub = dataset.filter(function(d) { return d.key === selectedKey});

  x.domain(d3.extent(datasetSub.map(function(d) { return d.month_number; })))
  y.domain([0, d3.max(datasetSub.map(function(d) { return d.value; }))])

  col.domain(merch_names)
}

// called after setupkey to update  the plot
var plot = function(){
  // title
  var m_names = title.selectAll('text').data(merch_names, function(d, i) { return Math.random() });

  m_names.enter().append('text')
  .attr({
    fill: function(d) { return col(d) },
    x: function(d, i) { return  250 + i * 250},
    dy: '-20px'
  })
  .classed('m_name', true)
  .text(function(d) { return d})

  m_names.exit().remove();

  // axis
  if(svg.select('.axis').node() == null){
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' +0 +',0)')
      .call(yAxis);
    }

  svg.selectAll('g.x.axis').transition().ease('elastic')
    .call(xAxis);

  svg.selectAll('g.y.axis').transition().ease('in-out ')
    .call(yAxis);

  // divide into two
  var merchants_arr = merch_names.map(function(m) { return datasetSub.filter(function(d) { return d.tx_merchant_clean == m})});


  // handling merchants in-out
  var m_layer = svg.selectAll('.merchant').data(merchants_arr);
  
  m_layer.enter().append('g')
    .attr('class', 'merchant');

  m_layer.exit().remove()


  // pathes
  m_layer_path = m_layer.selectAll('path')
    .data(function(d) {return [d.sort(function(a, b) { return a.month_number - b.month_number })] });

  m_layer_path.transition()
    .attr('d', function(d) { return line(d) })
    .attr('stroke', function(d) { return col(d[0].tx_merchant_clean)})
    .attr('stroke-width', '4px');


  m_layer_path.enter().append('path')
    .attr('d', function(d) { return line_hor(d) }).transition().delay(500).ease('out-in')
    .attr('d', function(d) { return line(d) })
    .attr('stroke', function(d) { return col(d[0].tx_merchant_clean)})
    .attr('stroke-width', '4px')

  m_layer_path.exit().remove()


  // circle
  var m_layer_circle = m_layer.selectAll('circle')
    .data(function(d) { return d }, function(d) { return d.month_number });
    
  m_layer_circle.transition().ease('sin')
    .attr({
      cx: function(d) { return x(d.month_number) },
      cy: function(d) { return y(d.value) },
      r: '5px'
    });

  m_layer_circle.enter().append('circle')
    .attr({
      cx: function(d) { return x(d.month_number) },
      cy: height,
      r: '5px',
      fill: 'white',
      stroke: function(d) { return col(d.tx_merchant_clean)},
      'stroke-width': '3px'
    }).transition().delay(function(d) { return d.month_number * 20})
    .attr({
      cx: function(d) { return x(d.month_number) },
      cy: function(d) { return y(d.value) },
    });

  m_layer_circle.exit().remove();
}

// Called to update the agg plots
var small_plots = function(){

  // Something is working even though it shouldent. 
  // Transistions are applied to the title, not the elements. yet they work.
  var margins = {top: 30, right: 60, bottom: 30, left: 60},
    width =  320 - margins.left - margins.right,
    height = 90 - margins.top - margins.bottom;

  // ########################################
  var svgCount = d3.select('#agg1')


  var x = d3.scale.linear()
            .range([0, width]);

  var y = d3.scale.linear()
            .range([height, 0]);

  var col = d3.scale.category10();

  svgCount.attr({
    width: width + margins.left + margins.right,
    height: height + margins.top + margins.bottom
  })

  var countDataset = dataset.filter(function(d) { return d.key === 'Count' });

  var merchants_data = merch_names.map(function(m) { 
    return { 
      name: m,
      value: countDataset.filter(function(d) { return d.tx_merchant_clean == m})
              .reduce(function(a, b) { return {value: a.value + b.value} }).value

    }
  });

  x.domain([0, d3.max(merchants_data, function(d) { return d.value})])
  y.domain([1,0]);


  merchants_data[0].value;

  // count thing
  var svgCountData = svgCount.selectAll('rect').data(merchants_data)

  svgCountDataEnter = svgCountData.enter()
  svgCountDataEnter.append('rect')
    .attr({
      width: 0,
      height: '25px',
      transform: function(d, i) { return 'translate(' + margins.left + ', ' + y(i)+ ')'},
      fill: function(d) { return col(d.name) }
    })
    .append('title').text(function(d) { return comma(d.value) })
    .transition().ease('in-out')
    .attr({
      width: function(d) { return x(d.value) },
    });
    
  svgCountData
    .transition().ease('in-out')
    .attr({
      width: function(d) { return x(d.value) },
    });

  if(firstTime){
    svgCount.append('text')
      .attr({
        transform: 'translate( ' + width /2 + ',' + (height + margins.top+margins.bottom) +' )',
        dy: '-2px',
        'text-anchor': 'start'
      }).text('Transaction Count');
  }


  // ######################################
  var totValSvg = d3.select('#agg2')

  totValSvg.attr({
    width: width + margins.left + margins.right,
    height: height + margins.top + margins.bottom
  })

  var sumDataset = dataset.filter(function(d) { return d.key === 'Sum'})

  var merchants_data = merch_names.map(function(m) { 
    return { 
      name: m,
      value: sumDataset.filter(function(d) { return d.tx_merchant_clean == m})
              .reduce(function(a, b) { return {value: a.value + b.value} }).value

    }
  });

  x.domain([0, d3.max(merchants_data, function(d) { return d.value})])
  y.domain([1,0]);


  merchants_data[0].value;

  // count thing
  var svgCountData = totValSvg.selectAll('rect').data(merchants_data)

  var svgCountDataEnter = svgCountData.enter()
  svgCountDataEnter.append('rect')
    .attr({
      width: 0,
      height: '25px',
      transform: function(d, i) { return 'translate(' + margins.left + ', ' + y(i)+ ')'},
      fill: function(d) { return col(d.name) }
    })
    .append('title').text(function(d) { return comma(d.value) })
    .transition().ease('in-out')
    .attr({
      width: function(d) { return x(d.value) },
    });
    
  svgCountData
    .transition().ease('in-out')
    .attr({
      width: function(d) { return x(d.value) },
    });

  if(firstTime){
    totValSvg.append('text')
      .attr({
        transform: 'translate( ' + width /2 + ',' + (height + margins.top+margins.bottom) +' )',
        dy: '-2px',
        'text-anchor': 'start'
      }).text('Total Transaction Value');
  }


  // ##################################### 
  var avgValSvg = d3.select('#agg3')

  avgValSvg.attr({
    width: width + margins.left + margins.right,
    height: height + margins.top + margins.bottom
  })

  var avgDataset = dataset.filter(function(d) { return d.key === 'Average'})

  var merchants_data = merch_names.map(function(m) { 
    return { 
      name: m,
      value: avgDataset.filter(function(d) { return d.tx_merchant_clean == m})
              .reduce(function(a, b) { return {value: a.value + b.value} }).value

    }
  });

  x.domain([0, d3.max(merchants_data, function(d) { return d.value})])
  y.domain([1,0]);


  merchants_data[0].value;

  // avg thing
  var svgAvgData = avgValSvg.selectAll('rect').data(merchants_data)

  var svgAvgDataEnter = svgAvgData.enter()
  svgAvgDataEnter.append('rect')
    .attr({
      width: 0,
      height: '25px',
      transform: function(d, i) { return 'translate(' + margins.left + ', ' + y(i)+ ')'},
      fill: function(d) { return col(d.name) }
    })
    .append('title').text(function(d) { return comma(d.value) })
    .transition().ease('in-out')
    .attr({
      width: function(d) { return x(d.value) },
    });
    
  svgAvgData 
    .transition().ease('in-out')
    .attr({
      width: function(d) { return x(d.value) },
    });

  if(firstTime){
    avgValSvg.append('text')
      .attr({
        transform: 'translate( ' + width /2 + ',' + (height + margins.top+margins.bottom) +' )',
        dy: '-5px',
        'text-anchor': 'start'
      }).text('Avg Transaction Value');
    }


  if(firstTime)
    firstTime = false
}

var updatePlots = function(){
  filterMerchants();
  setupKey(selectedKey);
  plot();
  small_plots();
}

var merchant1 = d3.select('#merchant1');
var merchant2 = d3.select('#merchant2');

$('#merchant1').on('select2:select', updatePlots)
$('#merchant2').on('select2:select', updatePlots)

var comma = d3.format(",.0f");

var margins = {top: 40, right: 10, bottom: 80, left: 80},
    width = 960 - margins.right - margins.left,
    height = 500 - margins.top - margins.bottom;

var x = d3.scale.linear()
          .range([0, width]);

var y = d3.scale.linear()
          .range([height, 0]);

var col = d3.scale.category10();


var months = ['Jan', 'Feb' , 'Mar', 'Apr', 'May' , 'June', 'July',
  'Aug', 'Sept', 'Oct' , 'Nov', 'Dec'];

var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom')
              .tickFormat(function(d) { return months[d -1]});

var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left');

var line = d3.svg.line()
             .x(function(d) { return x(d.month_number); })
             .y(function(d) { return y(d.value); });

var line_hor = d3.svg.line()
             .x(function(d) { return x(d.month_number); })
             .y(function(d) { return height; });
              

var col = d3.scale.category10()


var svg = d3.select('#main_plot svg#main')
  .attr({
    width: width + margins.left + margins.right,
    height: height + margins.top + margins.bottom
  }).append('g')
  .attr('transform', 'translate(' + margins.left + ', ' + margins.top + ' )');


var title = svg.append('g');

d3.selectAll('a.btn').on('mousedown', function(){
  var me = d3.select(this);

  selectedKey = me.attr('id');

  d3.selectAll('a.btn').classed('checked', false);
  me.classed('checked', true);
  setupKey(selectedKey);
  plot();
})

// read data
d3.csv('./perf_sub.csv', function(error, data){
  if(error) throw error;

  data.forEach(function(d){
    d.value = +d.value;
    d.month_number = +d.month_number;
  })

  globalDataset = data;
  globalMerchNames  = d3.set(globalDataset.map(function(d) { return d.tx_merchant_clean})).values();

  globalMerchNames.forEach(function(x, i) {
    merchant1.append('option').attr({value: x}).text(x);
    merchant2.append('option').attr({value: x}).text(x);
  })

  $('#merchant1').val(globalMerchNames[2]).trigger('change');
  $('#merchant2').val(globalMerchNames[4]).trigger('change');

  filterMerchants();
  setupKey('Sum');
  plot();
  small_plots();
})
