module.exports = (value, min, max) => {
    console.log(value, min, max)
    value = parseInt(value, 10);
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    if(isNaN(min) && isNaN(max))
        return true
    if(isNaN(max))
        return value >= min
    if(isNaN(min))
        return value <= max
    return value >= min && value <= max
}