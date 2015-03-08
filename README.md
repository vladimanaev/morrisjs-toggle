https://github.com/morrisjs/morris.js/

# morrisjs-toggle
A wrapper for morrisjs with toggle ability on all graphs

# Usage example

Morris line graph example:
```javascript
var morrisLineGraph = MTA.Line(
    'mta_graph',                     // Container id
    [                                // Initial data array
        {year: '2006', a: 100, b: 90},
        {year: '2007', a: 75, b: 65},
        {year: '2008', a: 50, b: 40},
        {year: '2009', a: 75, b: 65},
        {year: '2010', a: 50, b: 40},
        {year: '2011', a: 75, b: 65},
        {year: '2012', a: 100, b: 90}
    ],
    'year',                         // xKey
    ['a', 'b'],                     // yKeys
    ['Series A', 'Series B'],       // labels
    true                            // turn on/off toggle ability
);
```

---

Morris bar graph example:
```javascript
var morrisBarGraph = MTA.Bar(
    'mta_graph',                     // Container id
    [                                // Initial data array
        {year: '2006', a: 100, b: 90},
        {year: '2007', a: 75, b: 65},
        {year: '2008', a: 50, b: 40},
        {year: '2009', a: 75, b: 65},
        {year: '2010', a: 50, b: 40},
        {year: '2011', a: 75, b: 65},
        {year: '2012', a: 100, b: 90}
    ],
    'year',                         // xKey
    ['a', 'b'],                     // yKeys
    ['Series A', 'Series B'],       // labels
    true                            // turn on/off toggle ability
);
```


