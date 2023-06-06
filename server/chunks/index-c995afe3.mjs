import { p as publicAssetsURL } from './renderer.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import 'vue-bundle-renderer/runtime';
import 'h3';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const _imports_0 = "" + publicAssetsURL("banner-1.jpg");
const _imports_1 = "" + publicAssetsURL("picto-1.png");
const _imports_2 = "" + publicAssetsURL("picto-2.png");
const _imports_3 = "" + publicAssetsURL("picto-3.png");
const _imports_4 = "" + publicAssetsURL("picto-4.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="col-12"><img${ssrRenderAttr("src", _imports_0)} alt="Banni\xE8re" class="img-fluid"></div><div class="col-12"><div class="row d-flex justify-content-evenly"><div class="col-md-2 col-6 py-3 text-center fw-bold text-white"><div class="mb-3"><img${ssrRenderAttr("src", _imports_1)} alt="Picto 1" class="img-fluid" style="${ssrRenderStyle({ "height": "60px" })}"></div><div class="bg-success py-3"><p class="m-0"> WONDER MAMA <br> ZEN &amp; \xC9COLO ? </p></div></div><div class="col-md-2 col-6 py-3 text-center fw-bold text-white"><div class="mb-3"><img${ssrRenderAttr("src", _imports_2)} alt="Picto 2" class="img-fluid" style="${ssrRenderStyle({ "height": "60px" })}"></div><div class="bg-primary py-3"><p class="m-0"> WONDER MAMA <br> GASTRONOME ? </p></div></div><div class="col-md-2 col-6 py-3 text-center fw-bold text-white"><div class="mb-3"><img${ssrRenderAttr("src", _imports_3)} alt="Picto 3" class="img-fluid" style="${ssrRenderStyle({ "height": "60px" })}"></div><div class="bg-danger py-3"><p class="m-0"> WONDER MAMA <br> SPORT ? </p></div></div><div class="col-md-2 col-6 py-3 text-center fw-bold text-primary"><div class="mb-3"><img${ssrRenderAttr("src", _imports_4)} alt="Picto 4" class="img-fluid" style="${ssrRenderStyle({ "height": "60px" })}"></div><div class="bg-warning py-3"><p class="m-0"> WONDER MAMA <br> BIEN-\xCATRE ? </p></div></div><div class="col-md-4 col-6 py-3 d-flex"><div class="mt-auto mx-auto mb-2"><button class="btn text-white fw-bold px-5 py-3" style="${ssrRenderStyle({ "background-color": "#ED1C27" })}">Je fais le test</button></div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-c995afe3.mjs.map
