var React = require('react');
var ReactDOM = require('react-dom');
var XTemplate = require('../');
var util = require('modulex-util');
var hijs = require('highlight.js');
var js_beautify = require('js-beautify');

function js_beauty(str) {
  var opts = {
    "indent_size": "4", "indent_char": ' ',
    "preserve_newlines": true, "brace_style": "collapse",
    "keep_array_indentation": false, "space_after_anon_function": true
  };
  return js_beautify(str, opts);
}
var Test = React.createClass({
  parse() {
    var refs = this.refs;
    var g = XTemplate.Compiler.compileToStr({
      content: refs.tpl.value,
      catchError: refs.catchError.checked,
      useNativeRequire: refs.useNativeRequire.checked,
      isModule: refs.isModule.checked,
      strict: refs.strict.checked
    });
    refs.gen.innerHTML = ('<pre class="brush: js;">' +
    hijs.highlight('js', js_beauty(g)).value + '</pre>');
  },

  render() {
    return (<div>
      <link rel="stylesheet" href="//g.tbcdn.cn/kissy/k/1.4.2/css/dpl/base.css"/>
      <link rel="stylesheet" href="//g.tbcdn.cn/kissy/k/1.4.2/css/dpl/forms.css"/>
      <link rel="stylesheet" href="//g.tbcdn.cn/kissy/k/1.4.2/button/assets/dpl.css"/>
      <div className="container">
        <div className="row">
          <div className="span8">
            <h2>模板代码</h2>

            <div>
                <textarea style={{width: 350,height: 400}} ref="tpl" defaultValue={`
                    {{x.y.z.q}}

                  my first {{tpl(name ,'0', file=3)}} o

                  {{include('./y')}}

                  {{#each(this)}}
                  {{xindex}} {{name}}
                  {{/each}}

                  {{{ noEscapeO}}}

                  {{!

                    haha

                  }}

                  {{#if (cond)}}

                  y

                  {{#each (my)}}

                  {{escapeName}}

                  {{#if (cond2)}}

                  {{break}}

                  {{else}}

                  {{../../z}}

                  {{/if}}

                  {{/each}}

                  {{else}}

                  z

                  {{/if}}
`}/>
            </div>
            <br/>
            <button ref='parse' className="ks-button" onClick={this.parse}>parse</button>
            <span><label >isModule: <input type="checkbox" ref="isModule"/></label></span>
            <span><label >useNativeRequire: <input type="checkbox"
                                                   ref="useNativeRequire"/></label></span>
            <span><label >catchError: <input type="checkbox" ref="catchError"/></label></span>
            <span><label >strict: <input type="checkbox" ref="strict"/></label></span>
          </div>

          <div className="span15">
            <h2>Generated Template Function</h2>

            <div>
              <div ref="gen">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
});

ReactDOM.render(<Test />, document.getElementById('__react-content'));
