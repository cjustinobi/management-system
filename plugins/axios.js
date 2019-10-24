export default function ({ $axios, store }) {
    $axios.setHeader((config) => {
        config.headers.common['Access-Control-Allow-Origin'] = '*'
        config.headers.common['Access-Control-Allow-Credentials'] = 'true'
        config.headers.common['Access-Control-Allow-Methods'] = 'GET,HEAD,OPTIONS,POST,PUT'
        config.headers.common['Access-Control-Allow-Headers'] = `Access-Control-Allow-Headers, Origin,Accept, 
        X-Requested-With, Content-Type, 
        Access-Control-Request-Method, Access-Control-Request-Headers, user_id, user_type`
        return config
    })
}
