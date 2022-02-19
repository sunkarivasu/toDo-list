$(document).ready(function()
{
    $(".checkbox").change(function()
    {
        var number =$(this)[0].classList[1].slice(1,);
        if($(".item-"+number).hasClass("cross"))
        {
            $(".item-"+number).removeClass("cross")
        }
        else
        {
            $(".item-"+number).addClass("cross") 
        }
    })
})