(function() {
    var Timer = function(fn, interval) {
        var timer, beg = 0, fin = 0, total = 0, ready = true, tick = 0, self = this;

        this.loop = function() {
            clearTimeout(timer);
            ready = false;
            beg = new Date();
            (interval !== undefined) && (
                timer = setTimeout(function() {
                    self.fire(interval);
                    ready = true;
                }, interval)
            );
        };

        this.clear = function() {
            tick=0;
            total=0;
        };

        this.start = function() {
            this.clear();
            this.loop();
        };

        this.stop = function() {
            clearTimeout(timer);
        };

        this.fire = function(time) {
            if (ready) return;
            tick++;
            fin=new Date();
            total+=(time!==undefined) ? time : fin-beg;
            (fn.call(this)) ? (this.loop()) : this.stop();
        };

        this.time = function() {
            return total;
        };

        this.tick = function() {
            return tick;
        };

        this.timer = function() {
            return timer;
        };

        this.start();
    };
    
    this.Timer = Timer;
}).call(this);
