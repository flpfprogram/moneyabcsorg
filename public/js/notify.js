 $(".success").click(function(){
     alert('test');
        $.bootstrapGrowl('We do have the Kapua suite available.',{
            type: 'success',
            delay: 10000,
        });
    });

    $(".error").click(function(){
        $.bootstrapGrowl('You Got Error',{
            type: 'danger',
            delay: 10000,
        });
    });

    $(".info").click(function(){
        $.bootstrapGrowl('It is for your kind information',{
            type: 'info',
            delay: 10000,
        });
    });

    $(".warning").click(function(){
        $.bootstrapGrowl('It is for your kind warning',{
            type: 'warning',
            delay: 10000,
        });
    });