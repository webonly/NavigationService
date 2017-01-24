






var NavigationService=new NavigationService();
    debugAll=true;
    console.log(window);
    console.log(NavigationService);
    /**
     *建立链接
     */
    NavigationService.Init({
        url: "ws://192.168.0.7:9090",
        onopen: function () {
          NavEvent.Main();
          if (debugAll) console.log('navigation sevice connect success!');
        },
        onclose: function () {
          if (debugAll) console.log('navigation sevice connect close!');
        },
        onerror: function () {
          if (debugAll) console.log('navigation sevice connect error!');
        }
    });
    /**
     *主程序
     */
    var NavEvent = NavEvent || {
        Version:"",
        Main:function(){
            document.oncontextmenu = function (e) {
                e.preventDefault();
            };
            /** 全局订阅 */
            NavigationService.Subscribe_feedbackTopic(function(data){
                if (debugAll) console.log(data);
                switch (data.data) {
                case "joy_on":
                    //手柄打开
                    console.log("手柄打开--joy_on");
                    break;
                case "joy_off":
                    //手柄关闭
                    console.log("手柄关闭--joy_off");
                    break;
                case "save_map_edit":
                    //自主建图地图保存成功回调
                    console.log("自主建图地图保存成功");
                    break;
                case "save_as_map_edit":
                    //修改建图地图保存成功回调
                     console.log("修改地图保存成功");
                     NavigationService.Navigation(); 
                    break;
                default:
                    break;
                }
            });











        },
        GetNavMode:function(){
           /**
            * 订阅导航模式状态
            */
            NavigationService.Subscribe_diagnosticsTopic(function(data){
            for (var i = 0; i < data.status.length; i++) {
                    if (data.status[i].name == NavigationService.navModeStatus.navStatus) {
                         if (data.status[i].message==NavigationService.navModeStatus.Navigation) {
                            if (debugAll) console.log('导航模式');

                         }else if(data.status[i].message==NavigationService.navModeStatus.Gmapping){
                            if (debugAll) console.log('建图模式');

                         }else if(data.status[i].message==NavigationService.navModeStatus.Coverting){
                            if (debugAll) console.log('模式切换中');

                         }

                    }
                }
            });
        }

    };