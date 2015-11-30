'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/TypeActionCreators');
//var _ = require('lodash');
var request = require('superagent');
var prefix = require('superagent-prefix')('http://192.168.1.170:3000');


var ExamStore = Reflux.createStore({
    listenables: Actions,
    fetchAll: function () {
        var self = this;
        request
            .get('/exams/' + id)
            .set('x-hire-username', UserStore.username) //FOR TEST. 没有session也能访问的API
            .set('x-hire-token', UserStore.token)
            .use(prefix)
            .end(function (err, res) {
                res.body = res.body || JSON.parse(res.text);
                self.exam = res.body;
                self.trigger(self);
                if (cb) {
                    cb();
                }
            });
    },
    getInitialState: function () {
        this.exam = this.exam || {};
        return {
            exam: this.exam
        };
    },
    reset(){
        this.exam = {};
    }

});

module.exports = ExamStore;
