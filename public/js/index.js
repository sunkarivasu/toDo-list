$(document).ready(function()
{
    // $(".checkbox").change(function()
    // {
    //     var number = $(this)[0].classList[1].slice(1,);
    //     console.log(number);
    //     if($(".date").text()=="Today")
    //     {
    //         var type="/deleteItem";
    //     }
    //     else
    //     {
    //         var type="/delete"+$(".date").text();
    //     }
    //     $.ajax(
    //         {
    //             url:type,
    //             method:"POST",
    //             dataType:"json",
    //             data:{"itemNumber":number},
    //             success:function(res)
    //             {
    //                 if(res.status)
    //                 {
    //                     console.log("successfully deleted");
    //                     $(".item-"+number).addClass("hide");
    //                 }
                        
    //                 else
    //                     console.log("Not deleted");
    //             },
    //             error:function(err)
    //             {
    //                 console.log("error occured: "+err);
    //             }
    //         });
    //     // var number =$(this)[0].classList[1].slice(1,);
    //     // if($(".item-"+number).hasClass("cross"))
    //     // {
    //     //     $(".item-"+number).removeClass("cross")
    //     // }
    //     // else
    //     // {
    //     //     $(".item-"+number).addClass("cross") 
    //     // }
    // })
})