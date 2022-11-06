((window, factory) => {
    window.chrome = factory(window)
})(window, (window) => {
    class ChromeTabs 
    {
        get Tab() {
            

            class Tab
            {
                constructor(el) {
                    this.active = true;
                    this.audible = false;
                    this.autoDiscardable = false;
                    this.discarded = false;
                    this.groupId = 0;
                    this.height = el.offsetHeight;
                    this.incognito = true;
                    this.openerTabId = null;
                    this.pendingUrl = null;
                    this.pinned = false;

                    this.favIconUrl = el.querySelector('.chrome-tab-favicon').style.backgroundImage.slice(5, -2);
                    this.highlighted = (chromeTabs.activeTabEl === el)
                    this.selected = this.highlighted;
                    this.title = el.querySelector('.chrome-tab-title').textContent;
                    
                    $(".chrome-tab").get().forEach((value, index) => {
                        if (value == el) {
                            this.id = index+1
                            this.index = index
                            return;
                        }
                    })
                }
            }

            return Tab;
        }

        get(tabId, callback) {
            let tab =  $(".chrome-tab").get(tabId-1)
            callback(tab);
        }

        remove(tabIds, callback) {

        }
    }


    const chrome = {
        tabs: new ChromeTabs()
    }
    return chrome
})