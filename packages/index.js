import Outable from './index.vue';
import './common.less';

export default {
    install(app){
        app.component(Outable.name, Outable);
    }
};
