function UCOnePageNavigation(){
  
  var g_objWrapper;
  var isInAnySectionInside = true;
  var activeSectionId = null;
  var sections, sectionsAll, g_isEnableSnap, g_isEnableSnapMobile, g_dataAlwaysFirst, g_dataScrollSpeed;
  
  var currentIndex = 0;
  var isReloaded = true;
  var isAnimating = false;
    
  var stopAnimation = function() {
    
    setTimeout(function() {
      isAnimating = false;
    }, g_dataScrollSpeed);
    
  };
  
  //support for new elementor section class names
  var g_objSections;
  
  //page can contain several ".elementor" elements
  var objPages = jQuery(".elementor:not([data-elementor-type='header'])");
  
  objPages.each(function(index, parentElem){
    
    var objPage = jQuery(this);
    
    //use only first page element (other pages might be from Dynamic Post Popup or other iframes)
    if(index == 0){

      var regualrSectionSelector = "> .elementor-section";
      var hiddenClass = "ue-hidden";
      var hiddenSectionSelector = "."+hiddenClass;
      var objRegularSections = objPage.find(regualrSectionSelector);
      
      //make sure that sections from iframes don't contain hidden elements
      var objHiddenElements = jQuery(hiddenSectionSelector);

      objHiddenElements.each(function(){

        var objElement = jQuery(this);
        var objParents = objElement.parents();

        objParents.each(function(){

          var objParent = jQuery(this);
          var objChildElement = objParent.find(hiddenSectionSelector);

          if(objParent.hasClass("ue-dynamic-popup") == true)
          objChildElement.removeClass(hiddenClass);

        });
        

      });
      
      g_objSections = objPage.find(regualrSectionSelector+", "+hiddenSectionSelector);
      
      if(!objRegularSections.length)
      g_objSections = objPage.find("> .e-con, "+hiddenSectionSelector);
      
    }
    
  });
    
  // scrolls to target section
  function scrollToSection(target){
        
    isAnimating = true;
    
    jQuery("html").animate({ scrollTop: target }, g_dataScrollSpeed, stopAnimation);
    
  }
  
  // scrNav function 
  // Change active dot according to the active section in the window
  function scrNav() {
    
    window.ucWasDotActive = false;
    isInAnySectionInside = false;
    activeSectionId=null;
    
    g_objSections.each(function() {
      
      var e = jQuery(this);
      var sectionID = e.prop("id");
      
      if(!sectionID)
      return(true);
      
      var objLink = g_objWrapper.find('ul li > a[data-scroll="' + sectionID + '"]');
      
      if(objLink.length == 0)
      return(true);
      
      var isSectionInside = false;
      var offsetTop = e.offset().top;
      var windowHeight = jQuery(window).height();
      var windowScrollTop = jQuery(window).scrollTop();
      var sectionHeight = e.height();
      
      if(offsetTop - windowHeight / 2 < windowScrollTop && (offsetTop >= windowScrollTop || offsetTop + sectionHeight - windowHeight / 2 > windowScrollTop))
      isSectionInside = true;		
      
      isInAnySectionInside  = isInAnySectionInside||isSectionInside;	
      
      if(isSectionInside)
      activeSectionId=sectionID;
      
      
      
      if(isSectionInside == true && window.ucWasDotActive == false){
        objLink.addClass("uc_active");
        window.ucWasDotActive = true;
      }else{
        objLink.removeClass("uc_active");
      }	
      
    });
    
  }
  
  function onUp(e){	
    
    if(!isInAnySectionInside)
    return(true);
    
    if (isAnimating && e.type != "keydown") { // disables scroll when animating
      
      e.preventDefault();
      
      return(true);
      
    }
    
    var activeBulletIndex = g_objWrapper.find('.uc_active').parent().index(); // finds active section in 'sections' array
    
    if (currentIndex < 0)
    return;
    
    
    if (sectionsAll.length == sections.length){ // manage behaviour when amount of snapped sections are equal to amount of all sections
      
      if (currentIndex <= 0 && activeBulletIndex == 0)
      return(true);
      
    }
    
    
    if (isReloaded == true){
      
      currentIndex = 0;
      
      isReloaded = false;
      
    }
    
    currentIndex--;
    
    if(currentIndex < 0 && activeBulletIndex != 0){ // handle reload event
      
      var $previousSection = jQuery(sections[activeBulletIndex-1]);
      currentIndex = activeBulletIndex-1;
      
    }else{
      
      var $previousSection = jQuery(sections[currentIndex]);
      
    }
    
    if (!sections[currentIndex])// when currentIndex is not found do nothing
    return;
    
    var offsetTop = $previousSection.offset().top;
    
    e.preventDefault();
    
    scrollToSection(offsetTop);
    
    isReloaded = false;
    
  }
  
  function onDown(e){    
    
    if(!isInAnySectionInside){
      
      return(true);               
    }
    
    if (isAnimating && e.type != "keydown") { // disables scroll when animating
     
      e.preventDefault();
      
      return(true);
      
    }

    var activeBulletIndex = g_objWrapper.find('.uc_active').parent().index(); // finds active section in 'sections' array
    
    if (currentIndex + 1 > sections.length)
    return;      
    
    if (sectionsAll.length == sections.length){ // manage behaviour when amount of snapped sections are equal to amount of all sections
      isReloaded = false;
      
      if (currentIndex >= sections.length-1)
      return;
      
    }
    
    currentIndex++;
    
    if(currentIndex <= 1 && activeBulletIndex != 0){  // handle reload event
      
      var $nextSection = jQuery(sections[activeBulletIndex+1]);
      currentIndex = activeBulletIndex+1;
      
    }else{
      
      var $nextSection = jQuery(sections[currentIndex]);
      
    }
    
    if (!sections[currentIndex]) // when currentIndex is not found do nothing
    return;                  
    
    var offsetTop = $nextSection.offset().top;
    
    e.preventDefault();                  
    
    scrollToSection(offsetTop);
    
    // Set isReloaded to false immediately after the first scroll to the next section
    isReloaded = false;
    
  }
  
  function getAverage(elements, number){
    
    var sum = 0;
    var lastElements = elements.slice(Math.max(elements.length - number, 1));
    
    for(var i = 0; i < lastElements.length; i++){
      sum = sum + lastElements[i];
    }
    
    return Math.ceil(sum/number);
  }
  
  
  
  /**
  * run the navigation
  */
  function runNav(){
    
    //init globals
    var link = g_objWrapper.find('.uc_nav-menu li a.uc_dot');
    
    isInAnySectionInside = false;
    activeSectionId = null;
    
    sections = Array.from(link.map(index=>jQuery(link[index]).attr('href')));
    sectionsAll = Array.from(g_objSections);
    
    // Move to specific section when click on menu link
    link.on('click', function(e) {
      
      var target = jQuery(jQuery(this).attr('href'));
      var selectedIndex = jQuery(this).parent().index();
      
      scrollTo(target);
            
      jQuery(this).addClass('uc_active');
      
      currentIndex = selectedIndex;
      
      e.preventDefault();
      
    });
    
    
    //make sure that after load scroll begins from first section
    if(g_dataAlwaysFirst == true){
      
      var objHtml = jQuery("html, body");
      objHtml.css("scroll-behavior", "auto");
      
      //scroll without animation
      window.onbeforeunload = function () {       
        
        window.scrollTo(0, 0);
      }
      
    }
    
    // Run the scrNav when scroll
    jQuery(window).on('scroll', function(){
      scrNav();
    });
    
    scrNav();
    
    if(g_isEnableSnap == false)
    return(false);
    
    
    //run those only of the snap enabled
    
    jQuery(window).on("keydown", function(e) {
      
      if(e.which == 38) 
      onUp(e);
      
      if(e.which == 40) 
      onDown(e);
      
    });
    
    
    var prevTime = new Date().getTime();
    var scrollings = [];
    
    window.addEventListener('wheel',  function(e){
      
      var curTime = new Date().getTime();
      var value = e.wheelDelta || -e.deltaY || -e.detail;
      var delta = Math.max(-1, Math.min(1, value));
      var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
      var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX ) < Math.abs(e.deltaY) || !horizontalDetection);
      
      if(scrollings.length > 149){
        scrollings.shift();
      }
      
      scrollings.push(Math.abs(value));
      
      var timeDiff = curTime-prevTime;
      prevTime = curTime;
      
      if(timeDiff > 200){
        scrollings = [];
      }
      
      var averageEnd = getAverage(scrollings, 10);
      var averageMiddle = getAverage(scrollings, 70);
      var isAccelerating = averageEnd >= averageMiddle;
      
      if(isAccelerating && isScrollingVertically){
        if (delta < 0) {
          onDown(e);
        }else {
          onUp(e);
        }
      }
      else{
        e.preventDefault();
      }
      return false;
      
      
    } ,{passive:false} );  
    
    
    if(window.matchMedia("(max-width: 767px)").matches && g_isEnableSnapMobile == false){
      return(true);
    }
    
    /*
    * touch events
    */      
    var touchStartY = 0;
    var touchStartX = 0;
    var touchEndY = 0;
    var touchEndX = 0;
    
    if(window.matchMedia("(max-width: 767px)").matches && g_isEnableSnapMobile == false)
    return(true);
    
    document.body.addEventListener('touchmove', function(e){
      
      //preventing the easing on iOS devices
      
      // var e = event.originalEvent;
      var xThreshold = 100;
      
      touchEndY = e.changedTouches[0].pageY;
      touchEndX = e.changedTouches[0].pageX;
      
      if( Math.abs(touchStartX - touchEndX) < (Math.abs(touchStartY - touchEndY) + xThreshold)){
        
        if(touchStartY > touchEndY)
        onDown(e);
        else 
        onUp(e);
        
      }					
      
    }, { passive: false });
    
    jQuery(document).on('touchstart', function(e){
      // var e = event.originalEvent;
      touchStartY = e.touches[0].pageY;
      touchStartX = e.touches[0].pageX;	
      
    });
    
  }
  
  
  /**
  * init the object
  */
  this.init = function(wrapperID){
    
    g_objWrapper = jQuery(wrapperID);
    
    if(g_objWrapper.length == 0)
    throw new Error("one page navigation not found");
    
    g_isEnableSnap = g_objWrapper.data("enablesnap");
    g_isEnableSnapMobile = g_objWrapper.data("enablesnap-mobile");
    g_dataAlwaysFirst = g_objWrapper.data("always-first");
    g_dataScrollSpeed = g_objWrapper.data("scroll-speed");
    
    var isEditorMode = g_objWrapper.data("iseditormode");
    
    if(isEditorMode == "yes"){
      g_isEnableSnap = false;
      g_isEnableSnapMobile = false;
    }                  
    runNav();               	
  }
  
}