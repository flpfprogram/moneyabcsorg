$(function () {
    $("[rel='tooltip']").tooltip();

    $('.thumbnail').hover(
        function () {
            $(this).find('.sidebar_icons').slideDown(250); //.fadeIn(250)
        }
        , function () {
            $(this).find('.sidebar_icons').slideUp(250); //.fadeOut(205)
        }
    );
});
$(function () {
    $("[rel='tooltip']").tooltip();

    $('.thumbnail').hover(
        function () {
            $(this).find('.sidebar_icons').slideDown(250); //.fadeIn(250)
        }
        , function () {
            $(this).find('.sidebar_icons').slideUp(250); //.fadeOut(205)
        }
    );
});

/*$(window).scroll(function() {
  if ($(document).scrollTop() > 150) {
    $('nav').addClass('shrink');
    $('.mainPitch').fadeOut();
    $('.top-search-bar').fadeIn();  
  } else {
    $('nav').removeClass('shrink');
    $('.mainPitch').fadeIn();
    $('.top-search-bar').hide(); 
  }
});*/

$(function(){
    $('.onkeysearchbt').on("click",function(){
      var addedTopic=$('.typeahead li.active').attr('data-value');
        $('.selected-topics').append($('<span>',{
            text:'x  '+addedTopic,
            class: 'tag',
            id: addedTopic
        }));
    });
});

$(function(){
    $('.search').on("click",function(){
        $("#search-results").modal();
    });
});
$(".btn").on("click", function() {
    $(".alert").removeClass("in").show();
	$(".alert").delay(200).addClass("in").fadeOut(2000);
});

/*$(function () {
    var topic_images = $('.topic-images');
    main_topics=[1,16,21,31,59,76,97,128];
   for (i = 0; i < main_topics.length; i++) {
                topic_images.append($('<div>', {
                    id: i
                    , class:'col-md-4 topics-thumb'+i
                })).show('slow');
                $('.topics-thumb'+i).css('background-image','url(images/defaultImg/search_'+main_topics[i]+'/3.png)');
                $('.topics-thumb'+i).css('background-repeat','round');
                $('.topics-thumb'+i).css('width','150px');
                $('.topics-thumb'+i).css('height','150px');
                $('.topics-thumb'+i).css('object-fit','contain');

            }
});*/

$(function () {
//if (localStorage.getItem("articleTopics") !=""){
   // $('headRes').css('display','block');
  //  $('.subtitleRes').css('display','block');
//}else{
 //   $('.headDef').css('display','block');
 //   $('.subtitleDef').css('display','block');
//}
    var topicsContent;
    $.getJSON( "/topics.json", function( data ) {
    var topic_images = $('.topic-images');
    main_topics=[1,16,21,31,59,76,97,128,155,156];
   for (i = 0; i < main_topics.length; i++) {
                topic_images.append($('<div>', {
                    id: i,
                    class:'topic-img'+i
                })).show('slow')
                $('.topic-img'+i).css('background', '3px solid rgb(80, 198, 63)');
                $('.topic-img'+i).css('margin', '10px');
                $('.topic-img'+i).css('width', '200px');
                $('.topic-img'+i).css('height', '150px');
                $('.topic-img'+i).css('float', 'left');
                $('.topic-img'+i).css('background-image','linear-gradient( rgba(140, 198, 63, 0.8), rgba(140, 198, 63, 0.8)),url(images/defaultImg/search_'+main_topics[i]+'/3.png)');
                $('.topic-img'+i).css('background-size', 'cover');
                $('<i>', {
                    class: 'fa fa-check-circle fa-lg',
                }).appendTo('.topic-img'+i);
                $('.fa-check-circle').css('position',' absolute');
                $('.fa-check-circle').css('padding-top','10px');
                $('.fa-check-circle').css('padding-left','70px');
                $('.fa-check-circle').css('color','white');
                $('.fa-check-circle').css('display','none');
                $('<p>', {
                    class: 'topic-name'+i,
                    text: data[main_topics[i]].topics,
                    id: 'topic-name'+i
                }).appendTo('.topic-img'+i);
                //$('.topic-name'+i).css(' position',' absolute');
                //  $('.topic-name'+i).css(' bottom','20px');
                $('.topic-name'+i).css('padding',' 70px');
                $('.topic-name'+i).css('color','white');
                $('.topic-name'+i).css(' margin','0');
}
    });
});

$(function () {
    $('.topic-images').on("click", "div", function () {
           main_topics=[1,16,21,31,59,76,97,128,156,157];
        //$('.stickyFooter').show();
        if ($(this).css('border') !== '3px solid rgb(80, 198, 63)') {
            $(this).css('border', '3px solid rgb(80, 198, 63)').show('slow');
            $(this > 'i').css('display','block');
            var selected_img_id = $(this.id);
            var sel_img = this.id;
            var topic_images = $('.topic-images');
            var sel_img_pre=parseInt(sel_img)+1;
             $.getJSON( "/topics.json", function( data ) {
            for (i = main_topics[sel_img]+1; i < (main_topics[sel_img])+(main_topics[sel_img_pre]-main_topics[sel_img]); i++) {
                 topic_images.append($('<div>', {
                    id: i,
                    class:'sub-topic-img'+i
                })).show('slow')
                $('.sub-topic-img'+i).css('background', '1px solid rgb(2, 26, 64)');
                $('.sub-topic-img'+i).css('margin', '10px');
                $('.sub-topic-img'+i).css('width', '200px');
                $('.sub-topic-img'+i).css('height', '150px');
                $('.sub-topic-img'+i).css('float', 'left');
                $('.sub-topic-img'+i).css('background-image','linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(images/defaultImg/search_'+main_topics[sel_img]+'/search_'+i+'/2.png)');
                $('.sub-topic-img'+i).css('background-size', 'cover');
                $('<p>', {
                class: 'topic-name'+i,
                text: data[i].topics,
                id: 'topic-name'+i
            }).appendTo('.sub-topic-img'+i);
            //$('.topic-name'+i).css(' position',' absolute');
          //  $('.topic-name'+i).css(' bottom','20px');
            $('.topic-name'+i).css('padding',' 60px');
            $('.topic-name'+i).css('color','white');
            $('.topic-name'+i).css(' margin','0');
            }
             });
        }else{
            $(this).css('border', 'none')
        }     

    });
});
$(function () {
    $('.input-group-addon').on("click",function () {
    });
});
$(function () {
    $('#next_topics').on("click",function () {
        $('.footerContent').css('display','block');
        $('.subtitleRes').css('display','block');
        $('.headDef').css('display','none');
        $('.headRes').css('display','block');
        $('#previous_customize').css('display','block');
        $('.onkeysearchip').css('display','block');
        $('.topics').css('display','block');
        $('.customize_columns').css('display','none');
       $('.previous_customize').css('display','block');
    });
});
$(function () {
    $('#previous_customize').on("click",function () {
        $('.subtitleRes').css('display','none');
         $('.headDef').css('display','block');
        $('.headRes').css('display','none');
         $('.footerContent').css('display','none');
         $('#previous_customize').css('display','none');
        $('.onkeysearchip').css('display','none');
        $('.topics').css('display','none');
        $('.customize_columns').css('display','block');
    });
});

$(function () {
    $('#resourceHolder').on("click", "div", function () {
        var iframeLink = $(this).find('.embedUrl').text();
        var resourceTitle = $(this).find('.resourceTitle').text();
        $('.resourcesSpace').html(iframeLink);
        $('#modal_header').html('<p>'+resourceTitle+'</p>');
    });
});



$(function () {
    $('.modal-footer button').on("click",function () {
        $('.resourcesSpace').html('null');
    });
});

$(function () {
    $('.modal-header button').on("click",function () {
        $('.resourcesSpace').html('null');
    });
});

$(function(){
     if ($('.modal').css('display') == 'none') {
         $('.resourcesSpace').html('null');
     }
});

$(function(){
    $('.topic-images').on("click", "div", function () {
        var selectedTopic = $(this).find('p').text();
        $('.selected-topics').append($('<span>',{
            text:'x  '+selectedTopic,
            class: 'tag',
            id: selectedTopic
        }));
        
    });
});
$(function(){
    $('.selected-topics').on("click", "span",function () {
        $(this).remove();
    });
});
function test(){
    var test = new cAlert("Your customized values are save.", "success",3);
			test.alert();
} 
function sixcols() {
    $('.row:nth-child(n+2) .col-md-3').addClass('col-md-2').removeClass('col-md-3');
    $('.row:nth-child(n+2) .col-md-4').addClass('col-md-2').removeClass('col-md-4');
    $('.row:nth-child(n+2) .col-md-6').addClass('col-md-2').removeClass('col-md-6');
}

function original() {
    $('.row:nth-child(n+2) .col-md-2').addClass('col-md-3').removeClass('col-md-2');
    $('.row:nth-child(n+2) .col-md-4').addClass('col-md-3').removeClass('col-md-4');
    $('.row:nth-child(n+2) .col-md-6').addClass('col-md-3').removeClass('col-md-6');
}

function threecols() {
    $('.row:nth-child(n+2) .col-md-2').addClass('col-md-4').removeClass('col-md-2');
    $('.row:nth-child(n+2) .col-md-3').addClass('col-md-4').removeClass('col-md-3');
    $('.row:nth-child(n+2) .col-md-6').addClass('col-md-4').removeClass('col-md-6');
}
function twocols() {
    $('.row:nth-child(n+2) .col-md-2').addClass('col-md-6').removeClass('col-md-2');
    $('.row:nth-child(n+2) .col-md-3').addClass('col-md-6').removeClass('col-md-3');
    $('.row:nth-child(n+2) .col-md-4').addClass('col-md-6').removeClass('col-md-4');
}
$(function () {
    $('#schema').on("click", "div", function () {
        $('#schema div').css('border','none');
        if ($(this).css('border') !== '3px solid rgb(80, 198, 63)') {
            $(this).css('border','3px solid rgb(80, 198, 63)').show('slow');
        }else{
            $(this).css('border', 'none')
        }

    });
});
// .modal-backdrop classes

$(".modal-transparent").on('show.bs.modal', function () {
    setTimeout(function () {
        $(".modal-backdrop").addClass("modal-backdrop-transparent");
    }, 0);
});
$(".modal-transparent").on('hidden.bs.modal', function () {
    $(".modal-backdrop").addClass("modal-backdrop-transparent");
});

$(".modal-fullscreen").on('show.bs.modal', function () {
    setTimeout(function () {
        $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
    }, 0);
});
$(".modal-fullscreen").on('hidden.bs.modal', function () {
    $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
});


var alertQueue = [];
var alerts = [];

//var cAlert = function(body, type, icon = "bubble2", time = 2) {
cAlert = function(body, type, icon = "bubble2", time = 2) {
	this.body = body;
	this.type = type;
	this.icon = icon;
	this.time = time;
	
	// Add the alert to the list of all alerts
	alerts.push(this);
	
	// _this is to refer to the correct cAlert class, we can't access "this" inside a private function
	var _this = this;
		
	// Generate a random ID for the alert
	this.id = generateUUID();
	
	// Create the element
	this.elem = $('<div class="cAlert cAlert-'+this.type+'" type="alert" id="'+this.id+'" style="display: none"><i class="cIcon icon-'+this.icon+'" type="alert-type-icon"></i><div class="cAlert-content"><p>'+this.body+'</p></div><div class="cAlert-queue-count" id="qc-'+this.id+'"><span class="queue-count">0</span></div></div>');
	
	// Stores the ID of the timeout to dismiss the alert
	this.hideTimeout = undefined;
	
	// Set click event
	this.elem.on("click", function() { _this.click(); });
	
	this.alert = function() {
		// Call onalert function
		if(this.onalert() === false)
		{
			return;
		}
		
		// Append the alert to the body, hidden
		$("body").append(this.elem);
		
		// Set the position of the alert queue count box (The alert box height + 2, the border is 2px)
		$("#qc-" + this.id).css("top", this.elem.height() + 2);
		
		// Set the alert visible and put it outside the screen
		this.elem.css("display", "").css("top", 0 - this.elem.height() - $("#qc-" + this.id).height() - 20);

		// Move the alert into the screen by moving it down from it's first position
		$("#" + this.id).stop().animate({top:0}, 500, this.onalertdone);

		// Remove the alert after the entered time in seconds
		// setTimemout is in milliseconds so we have to convert the seconds entered
		if(this.time !== 0)
		{
			hideTimeout = setTimeout(function () { _this.dismiss() }, this.time * 1000);
		}
	};
	
	this.queue = function() {
		// Check if the current alert is in the queue already
		var isInQueue = false;
		for(anAlert of alertQueue)
		{
			if(anAlert === this)
			{
				isInQueue = true;
				break;
			}
		}
		
		// If it's not in the queue we add the alert to the queue.
		if(!isInQueue)
		{
			// Add the alert to the queue
			alertQueue.push(this);
		}
		
		if(alertQueue[0] === this)
		{
			// Launch alert on the alert on index 0
			alertQueue[0].alert();
		}
		
	};

	this.dismiss = function() {
		// Call the ondismiss function
		if(this.ondismiss() === false)
		{
			return;
		}
	
		// Make the alert go up and then we remove it
		// We also call the ondismissed function
		this.elem.stop().animate({top: 0 - this.elem.height() - $("#qc-" + this.id).height() - 20}, 500, function() { _this.ondismissed(); _this.remove(); });
	}

	this.remove = function() {
		// Check if the alert is in the queue
		if(this.isInQueue())
		{
			// If the alert is in the queue we remove it from the queue
			// when the alert is removed.
			var index = getIndexAlertQueue(this.id);
			alertQueue.splice(index, 1);
			// Check if there's another one in the queue
			if(alertQueue[0])
			{
				// Queue that alert
				alertQueue[0].queue();
			}
		}
		
		// Call the onremove function
		if(this.onremove() === false)
		{
			return;
		}
		
		// Remove the element from the body
		this.elem.remove();
	}

	this.click = function() {
		// Call the onclick function
		if(this.onclick() === false)
		{
			return;
		}
		
		// If the alert has a timer until it is being removed
		if(this.hideTimeout)
		{
			// Remove the timeout when we click the alert
			clearTimeout(this.hideTimeout);
		}
		
		// Call the remove function
		this.remove();
	}
	
	this.isInQueue = function() {
		// Get the index of the alert in the alertQueue list (if it exists, otherwise it returns -1)
		var index = getIndexAlertQueue(this.id);
		// If index is greater than -1
		if(index > -1)
		{
			// The alert is in the queue list, index would've been -1 if it wasn't in the list
			return true;
		}
		// The index was not greater than -1, return false
		return false;
	};

	// When the alert() function is called
	this.onalert = function() {};
	// When the alert animation from alert() is done
	this.onalertdone = function() {};

	// When the show() function is called
	this.onshow = function() {};
	// When the dismiss() function is called
	this.ondismiss = function() {};

	// When the alert animation from show() is finished
	this.onshown = function() {};
	// When the alert animation from dismiss() is finished
	this.ondismissed = function() {};

	// When the alert box is clicked
	this.onclick = function() {};
	
	// When the alert is removed
	this.onremove = function() {};
}

function getIndexAlertQueue(id)
{
	var index = 0;
	for(anAlert of alertQueue)
	{
		if(anAlert.id === id)
		{
			return index;
		}
		index++;
	}
	
	return -1;
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    
    return uuid;
};



$(function () {
    function displayResult(item) {
        $('.alert').show().html('You selected <strong>' + item.value + '</strong>: <strong>' + item.text + '</strong>');
    }
    $('.search1').typeahead({
        source: [ 'Finance Planning ','Career Planning ','Financial Planners ','Financial Goals ','Time Value of Money ','Money Management ' ,'Financial Record System ' ,'Personal Financial Statements ','Budgeting ','Savings ','Payment Methods ','Bank Currency ','Insurance Companies ','Private Insurance Companies ','Financial Advisors','Career Choice ','Employment Search ','Employee Benefits ','Career Development ','Taxes ','Tax Refunds ','Tax Advance Loans ','Federal Income Taxes ','Tax Deductions ','Tax Credits ','Tax Planning ','Tax Preparers ','Tax Advisors ','Major Purchases ','Bankers ','Consumer Credit ','Types of Credit ','Revolving Loans ','Open Ended Loans ','Close Ended Loans ','Revolving Loans ','Credit Capacity ','Debt History ','Applying for Credit','Interest Rates','Credit History','Credit Scores','Credit Counseling','Consumer Rights','Predatory Lending Practices','Bank Corruption','Title Loans','Debt Collection','Bankruptcy ','Chapter 11 Bankruptcy','Pawn Shops ','Tax Advance Loans ','Payday Loans ','Rent to Own ','Tax Refund Anticipation Loans ','Real Estate Brokers ','Housing ','Home Buying ','Property Providers ','Brokers Price Opinio BPO' ,'Mortgages ','Renting','Homeowners Insurance','Property Insurance','Mortgage Insurance','Renters Insurance','Car Shopping','Auto Loans','Home Selling ','Liability Insurance ','Auto Insurance ','Health Plans ','Home Health Care ','Health Maintenance Organizations HMOs ','Preferred Provider Organization PPOs ','Medical Service Plans ','Health Insurance ','Medical Insurance ','Medicare ','Medicaid ','Bodily Injury Insurance','Short Term Disability Insurance ','Long Term Disability Insurance  ','Whole Life Insurance ','Turned Life Insurance ','Short Term Insurance ','Term Life Insurance ','Annuities ','Insurance Beneficiaries  ','Child Custody ','Custody ','Investments ','Investment Goals','Investment Strategies ','Investment Income ','Investment Growth ','Investment Equity ','Investment Risks ','Investment Alternatives ','Asset Allocation ','Diversification ','Modern Markets ','Capital Markets ' ,'Stocks ','Mutual Funds ','Real Estate ','Real Estate Investment Trusts REITs ','Common Stock ','Preferred Stock ','Corporate Bonds ','Government Bonds ','Municipal Bonds ','Convertible Bonds ','Exchange Traded Funds ','Index Funds ','Precious Metals ','Collectibles ','Gold ','Stock Brokers ','Investment Bankers ','Financial Analysts ','Retirement ','Retirement Planning ','Retirement Housing ','Retirement Income ','Retirement Living Expenses ','Social Security ','Pensions ' ,'Public Pensions ','Employer Pensions ','Personal Retirement Plans ','Individual Retirement Accounts ','Roth Individual Retirement Accounts ','401 A ','401 B ','401 K ','403 B ','457 ','Thrift Savings Plan TSP ' ,'Retirement Employment ','Wills ','Power of Attorney ','Letter of Lest Instruction ','Trusts ' ,'Trustees ','Estate ' ,'Probate ' ,'Lawyers' ,'Debit collection','Home owners insurance']
        , onSelect: displayResult
    });
    $('.search2').typeahead({
        source: [ 'Finance Planning ','Career Planning ','Financial Planners ','Financial Goals ','Time Value of Money ','Money Management ' ,'Financial Record System ' ,'Personal Financial Statements ','Budgeting ','Savings ','Payment Methods ','Bank Currency ','Insurance Companies ','Private Insurance Companies ','Financial Advisors','Career Choice ','Employment Search ','Employee Benefits ','Career Development ','Taxes ','Tax Refunds ','Tax Advance Loans ','Federal Income Taxes ','Tax Deductions ','Tax Credits ','Tax Planning ','Tax Preparers ','Tax Advisors ','Major Purchases ','Bankers ','Consumer Credit ','Types of Credit ','Revolving Loans ','Open Ended Loans ','Close Ended Loans ','Revolving Loans ','Credit Capacity ','Debt History ','Applying for Credit','Interest Rates','Credit History','Credit Scores','Credit Counseling','Consumer Rights','Predatory Lending Practices','Bank Corruption','Title Loans','Debt Collection','Bankruptcy ','Chapter 11 Bankruptcy','Pawn Shops ','Tax Advance Loans ','Payday Loans ','Rent to Own ','Tax Refund Anticipation Loans ','Real Estate Brokers ','Housing ','Home Buying ','Property Providers ','Brokers Price Opinio BPO' ,'Mortgages ','Renting','Homeowners Insurance','Property Insurance','Mortgage Insurance','Renters Insurance','Car Shopping','Auto Loans','Home Selling ','Liability Insurance ','Auto Insurance ','Health Plans ','Home Health Care ','Health Maintenance Organizations HMOs ','Preferred Provider Organization PPOs ','Medical Service Plans ','Health Insurance ','Medical Insurance ','Medicare ','Medicaid ','Bodily Injury Insurance','Short Term Disability Insurance ','Long Term Disability Insurance  ','Whole Life Insurance ','Turned Life Insurance ','Short Term Insurance ','Term Life Insurance ','Annuities ','Insurance Beneficiaries  ','Child Custody ','Custody ','Investments ','Investment Goals','Investment Strategies ','Investment Income ','Investment Growth ','Investment Equity ','Investment Risks ','Investment Alternatives ','Asset Allocation ','Diversification ','Modern Markets ','Capital Markets ' ,'Stocks ','Mutual Funds ','Real Estate ','Real Estate Investment Trusts REITs ','Common Stock ','Preferred Stock ','Corporate Bonds ','Government Bonds ','Municipal Bonds ','Convertible Bonds ','Exchange Traded Funds ','Index Funds ','Precious Metals ','Collectibles ','Gold ','Stock Brokers ','Investment Bankers ','Financial Analysts ','Retirement ','Retirement Planning ','Retirement Housing ','Retirement Income ','Retirement Living Expenses ','Social Security ','Pensions ' ,'Public Pensions ','Employer Pensions ','Personal Retirement Plans ','Individual Retirement Accounts ','Roth Individual Retirement Accounts ','401 A ','401 B ','401 K ','403 B ','457 ','Thrift Savings Plan TSP ' ,'Retirement Employment ','Wills ','Power of Attorney ','Letter of Lest Instruction ','Trusts ' ,'Trustees ','Estate ' ,'Probate ' ,'Lawyers' ,'Debit collection','Home owners insurance']
        , onSelect: displayResult
    });
});

$("select").imagepicker();
