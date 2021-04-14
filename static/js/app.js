
    // the below function will build both Bar and Bubble charts
    function buildPlot(subject){
        
        d3.json("data/samples.json").then((data)=> {
            //console.log(data)

            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // Bar Plot

            // filter sample values by id 
            var samples = data.samples.filter(s => s.id === subject)[0];

            //console.log(samples);

            // get only top 10 sample values
            var sampleValues = samples.sample_values.slice(0, 10).reverse();

            // get only top 10 OTU id's
            var otuIds = samples.otu_ids.slice(0, 10).map(id => ("OTU " + id)).reverse();
            //console.log(idValues);

            // get only top 10 OTU labels
            var otuLabels = samples.otu_labels.slice(0, 10).reverse();
            
            //console.log(otu_ids);

            var trace1 = {
                x: sampleValues,  
                y: otuIds,
                text: otuLabels,
                type: 'bar',
                orientation: 'h'
            };

            //console.log(trace1);

            var bar_data = [trace1];
        
            var bar_layout = {
                title: "Top 10 OTU's for individual",
                height: 600,
                width: 400
            };

            // create the bar plot
            Plotly.newPlot("bar", bar_data, bar_layout)


            // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // Bubble Plot

            var otuIds = samples.otu_ids;
            var sampleValues = samples.sample_values;
            var otuLabels = samples.otu_labels;

            var trace1 = {
                x: otuIds,
                y: sampleValues,
                mode: "markers",
                marker: {
                    size: sampleValues,
                    color: otuIds,
                    colorscale: "Earth"
                },
                text: otuLabels

            };

            // create the data variable 
            var bubble_data = [trace1];

            // set the layout for the bubble plot
            var bubble_layout = {
                title: "OTU ID",
                height: 600,
                width: 1200
            };

            // create the bubble plot
            Plotly.newPlot("bubble", bubble_data, bubble_layout);
            
        });
    };

    
    // below function will build the Demographic Info table
    function metadata(subject) {
        d3.json("data/samples.json").then((data) => {
            var metadata = data.metadata;
            var subjectMetadata = metadata.filter(subjects => subjects.id == subject);
            
            //console.log(subjectMetadata[0]);

            var subjectResult = subjectMetadata[0];

            var demoTable = d3.select("#sample-metadata");
    
            demoTable.html("");
          
            Object.entries(subjectResult).forEach(([key, value]) => {
                demoTable.append("h6").append("b").text(key + ': ' + value); 
            })
        })
    };



    // the below function will be called once user selects any name from dropdown
    // It will inturn call child build plot function to display the Bar and Bubble charts
    function optionChanged(newSubject) {
        buildPlot(newSubject);
        metadata(newSubject);
    };



    // the below function will show all the names under dropdown
    // it will append all those names to dropdown
    // it will also display default Bar and Bubble charts for - 940
    function init() {
        var selectSubject = d3.select("#selDataset");
       
        d3.json("data/samples.json").then((data) => {
            var names = data.names;
            names.forEach((subject) => {
                //console.log(subject);
                selectSubject.append("option").text(subject);
            });

            // call the functions to display the data and the plots for default id - 940
            buildPlot(data.names[0]);
            metadata(data.names[0]);
            
        })
    };
    

    
    // call the init function to display default Bar, Bubble charts and Demographic Info table for - 940
    init();





    