/* eslint-disable no-eval */
/**
 * 注意： 通过impor导入的js文件会被编译过的。
 * **/

// ==UserScript==
// @name         原神抽卡链接获取
// @namespace    Z2Vuc2hpbi1nYWNoYS11cmw=
// @version      0.2
// @description  try to take over the world!
// @author       You
// @run-at       document-start
// @match        https://user.mihoyo.com/*
// @grant        none
// ==/UserScript==

/* \
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/


/* eslint-disable */
function getLink() {
  'use strict';
  const docCookies = {
    getItem(sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    },
    setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      let sExpires = '';
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
            break;
          case String:
            sExpires = '; expires=' + vEnd;
            break;
          case Date:
            sExpires = '; expires=' + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
      return true;
    },
    removeItem(sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
      return true;
    },
    hasItem(sKey) {
      return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function() {
      const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
      for (let nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
    },
  };

  function getDs() {
    const salt = 'ulInCDohgEs557j0VsPDYnQaaz6KJcv5';
    const time = parseInt(Date.now() / 1000);
    const str = getStr();
    const md5 = window.md5(`salt=${salt}&t=${time}&r=${str}`);
    return `${time},${str},${md5}`;
  }

  function getStr() {
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = chars.length;
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[parseInt(Math.floor(Math.random() * maxPos))];
    }
    return code;
  }

  function setCookie(list) {
    return Promise.all(list.map(item => {
      return window.cookieStore.set({
        name: item.name,
        value: item.token,
        domain: 'mihoyo.com',
        sameSite: 'none',
      });
    }));
  }

  function showGachaUrl(server) {
    const item = docCookies.getItem('_MHYUUID');
    const body = JSON.stringify({
      auth_appid: 'webview_gacha',
      game_uid: server.game_uid,
      game_biz: server.game_biz,
      region: server.region,
    });
    const DS = getDs();
    // alert(body);
    // alert(DS);
    // alert(JSON.stringify(docCookies.keys()))
    fetch('https://api-takumi.mihoyo.com/binding/api/genAuthKey', {
      credentials: 'include',
      method: 'post',
      mode: 'cors',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8',
        Host: 'api-takumi.mihoyo.com',
        'x-rpc-client_type': '5',
        'x-rpc-app_version': '2.28.1',
        'x-rpc-device_id': item,
        DS,
      },
      body,
    }).then(res => res.json()).then(res => {
      // alert(JSON.stringify(res));
      // let url = `https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?win_mode=fullscreen&authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=b4ac24d133739b7b1d55173f30ccf980e0b73fc1&lang=zh-cn&device_type=mobile&game_version=CNRELiOS3.0.0_R10283122_S10446836_D10316937&plat_type=ios&game_biz=${server.game_biz}&size=20&authkey=${encodeURIComponent(res.data.authkey)}&region=${server.region}&timestamp=1664481732&gacha_type=200&page=1&end_id=0`
      const url =
          `https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?win_mode=fullscreen&authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=b4ac24d133739b7b1d55173f30ccf980e0b73fc1&lang=zh-cn&device_type=mobile&game_version=CNRELiOS3.0.0_R10283122_S10446836_D10316937&plat_type=ios&game_biz=${server.game_biz}&size=20&authkey=${encodeURIComponent(res.data.authkey)}&region=${server.region}&timestamp=1664481732&gacha_type=200&page=1&end_id=0`;

      // uni.postMessage({
      //   data: {
      //     url,
      //   },
      // });
      // document.addEventListener('UniAppJSBridgeReady', function() {
      //   alert('UniAppJSBridgeReady')
      //
      // });
      console.log(url);
      window.navigator.clipboard.writeText(url).then(() => {
        alert('已复制');
      })

    });
  }

  function getGachaUrl() {
    let uid = '';
    let token = '';
    fetch(`https://webapi.account.mihoyo.com/Api/login_by_cookie?t=${Date.now()}`, {
      credentials: 'include',
    }).then(res => res.json()).then(res => {
      uid = res.data.account_info.account_id;
      token = res.data.account_info.weblogin_token;
      return fetch(`https://api-takumi.mihoyo.com/auth/api/getMultiTokenByLoginTicket?login_ticket=${token}&token_types=3&uid=${uid}`, {
        credentials: 'include',
      });
    })
      .then(res => res.json())
      .then(res => {

        // document.cookie = `stuid=${uid}`
        docCookies.setItem('stuid', uid, null, null, 'mihoyo.com', null);
        res.data.list.forEach(ele => {
        // document.cookie = `${ele.name}=${ele.token}`
          docCookies.setItem(ele.name, ele.token, null, null, 'mihoyo.com', null);

        });

        // function setCookie(list) {
        //   return Promise.all(list.map(item => {
        //     return window.cookieStore.set({
        //       name: item.name,
        //       value: item.token,
        //       domain: 'mihoyo.com',
        //       sameSite: 'none'
        //     })
        //   }))
        // }


        return Promise.resolve(undefined);
      // return window.cookieStore.set({
      //   name: 'stuid',
      //   value: uid,
      //   domain: 'mihoyo.com'
      //    }
      // ).then(() => {
      //      return setCookie(res.data.list, 0)
      // }).then(() => {
      //   return fetch('https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_cn', {
      //     credentials: 'include'
      //   })
      // })
      })
      .then(() => {
        return fetch('https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_cn', {
          credentials: 'include',
        });
      })
      .then(res => res.json())
      .then(res => {
        res.data.list.forEach(server => {
          showGachaUrl(server);
        });
      });
  }


  // const page_path = document.querySelector('#root').__vue__.$route.path
  const page_path = window.location.hash;
  // const isHomePage = page_path === '/account/home';
  const isHomePage = (page_path === "#/account/home") || (page_path === "#/account/game/verification");
  if (isHomePage) {
    getGachaUrl()
  }else {
    alert('请先登录再点击获取链接！')
  }
}
