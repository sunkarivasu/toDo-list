 exports.getDate = function()
{
    return new Date().toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});
}

exports.getDay = function()
{
    return new Date().toLocaleDateString(undefined,{weekday:"long"});
}