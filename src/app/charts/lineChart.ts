export let getLineChart = (chartData: any) => {
    let data = {
        "chart": {
            "theme": "fusion",
            "caption": "Weather forecast for 7 days",
            "subCaption": "7 Day Forecast",
            "xAxisName": "Day",
            "yAxisName": "temperature in 'C",
            "lineThickness": "2"
        },
        categories: chartData.categories,
        dataset: chartData.dataset

    }

    // data.data

    return data;

}