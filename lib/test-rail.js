const request = require("sync-request");

/**
 * TestRail basic API wrapper
 */
class TestRail {

    /**
     * @param {{domain}} options
     */
    constructor(options) {
        // compute base url
        this.options = options;
        this.base = `https://${options.domain}/index.php`;
    }

    /**
     * @param {string} path
     * @return {string}
     * @private
     */
    _url(path) {
        return `${this.base}?${path}`;
    }

    /**
     * @callback callback
     * @param {{}}
     */
    /**
     * @param {string} api
     * @param {*} body
     * @param {callback} callback
     * @param {callback} error
     * @private
     */
    _post(api, body, callback, error = undefined) {
        let result = request(
            "POST",
            this._url(`/api/v2/${api}`), {
                headers: {
                    "Authorization" : "Basic " + new Buffer(this.options.username + ":" + this.options.password).toString("base64")
                },
                json: body
            }
        );

        result = JSON.parse(result.getBody('utf8'));
        if (result.error) {
            console.log("Error: %s", JSON.stringify(result.body));
            if (error) {
                error(result.error);
            } else {
                throw new Error(result.error);
            }
        } else {
            callback(result);
        }
    }

    /**
     * Publishes results of execution of an automated test run
     * @param {string} name
     * @param {string} description
     * @param {[]} results
     * @param {callback} callback
     */
    publish(name, description, results, callback = undefined) {
        console.log(`Publishing ${results.length} test result(s) to ${this.base}`);

        this._post(`add_run/${this.options.projectId}`, {
            "suite_id": this.options.suiteId,
            "name": name,
            "description": description,
            "assignedto_id": this.options.assignedToId,
            "include_all": true
        }, (body) => {
            const runId = body.id;
        console.log(`Results published to ${this.base}?/runs/view/${runId}`);
        this._post(`add_results_for_cases/${runId}`, {
            results: results
        }, (body) => {
            // execute callback if specified
            if (callback) {
                callback(body);
            }
        })
    });
    }
}

module.exports = TestRail;