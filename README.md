https://github.com/morrisjs/morris.js/

# morrisjs-toggle
A wrapper for morrisjs with toggle ability on all graphs
Based on a supplied morris config object it creates toggled checkbox. See examples below.

# Usage example

Toggle ability example
```javascript 
var mtaObj = MTA.Line(...);
mtaObj.toggleYKeys(['a','b']);
```

Morris line graph example:
```javascript
var morrisLineGraph = MTA.Line({
            //Morris configuration obj
            element: 'line_mta_graph',
            data: [
                {year: '2006', a: 100, b: 90, c: 80, d: 70},
                {year: '2007', a: 75, b: 65, c: 55, d: 45},
                {year: '2008', a: 50, b: 40, c: 30, d: 20},
                {year: '2009', a: 75, b: 65, c: 55, d: 45},
                {year: '2010', a: 50, b: 40, c: 30, d: 20},
                {year: '2011', a: 75, b: 65, c: 55, d: 45},
                {year: '2012', a: 100, b: 90, c: 80, d: 70}
            ],
            xkey:  'year',
            ykeys: ['a', 'b', 'c', 'd'],
            labels: ['Series A', 'Series B', 'Series C', 'Series D']
        },
        true // draw toggle checkbox buttons
);
```

---

Morris bar graph example:
```javascript
var morrisBarGraph = MTA.Bar({
        //Morris configuration obj
        element: 'mta_graph',
        data: [
            {year: '2006', a: 100, b: 90},
            {year: '2007', a: 75, b: 65},
            {year: '2008', a: 50, b: 40},
            {year: '2009', a: 75, b: 65},
            {year: '2010', a: 50, b: 40},
            {year: '2011', a: 75, b: 65},
            {year: '2012', a: 100, b: 90}
        ],
        xkey:  'year',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B']
    },
    true // draw toggle checkbox buttons
);
```


