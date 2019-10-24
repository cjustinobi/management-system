import glob from 'glob'

export default function(moduleOptions) {
    const options = Object.assign({}, this.options.engines, moduleOptions);
    const engines = Object.keys(options);
    const vue = this

    this.nuxt.hook("build:extendRoutes", function(routes, resolve) {
        engines.forEach(async function (engine) {
            const {mount} = options[engine]
            const files = {}
            const base = `${vue.options.srcDir}/engines/${engine}/pages`
            const dir = await asyncGlob(
                `${base}/**/*.{vue,js}`,
                {
                    cwd: vue.options.srcDir,
                    ignore: vue.options.ignore
                })
            dir.forEach(f => {
                const key = f.replace(/\.(js|vue)$/, '').substr(base.length)
                if (/\.vue$/.test(f) || !files[key]) {
                    files[key] = f.replace(/(['|"])/g, '\\$1')
                }
            });

            const engineRoutes = Object.keys(files).map(name => {
                const component = files[name];
                return {name: `${engine}${name}`, path: `${mount}${name}`, component};
            });

            // Add default route if there is a default index.vue or index.js file.
            const indexRoute = Object.keys(files).find(value => value === '/index')
            if (indexRoute !== undefined) {
                engineRoutes.push({name: engine, path: mount, component: files[indexRoute]})
            }

            routes.push(...engineRoutes);
        });
    })

}

async function asyncGlob(pattern, options) {
    let resolved = false;
    let globerror = null;
    let globfiles = [];
    const promise = new Promise((resolve, reject) => {
        const waitFor = (status, timeout, success, fail) => {
            if (status()) {
                success()
            }
            else if (timeout > 0) {
                setTimeout(() => waitFor(status,timeout - 10, success, fail), 10)
            }
            else {
                fail()
            }
        }
        waitFor(
            () => resolved,
            10000,
            () => resolve(globfiles),
            () => reject(new Error(globerror))
        )
    })
    glob(pattern, options,function(error, files) {
        if (!error) {
            resolved = true;
            globfiles = files
        }
        else {
            globerror = error
        }
    })
    return promise
}
