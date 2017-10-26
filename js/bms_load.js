// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var __str_uid_InputFile = '_inf_BMs_load';

var __int_tid_CurTab = null;

function __jui_BMs_Load(ev)
{
  var reader = new FileReader();
  var file = document.getElementById(__str_uid_InputFile).files[0];
  reader.readAsText(file, "UTF-8");
  reader.onload = function (evt) {
    var json_BM = JSON.parse(evt.target.result);
    chrome.extension.sendMessage({ msg: "BMs_Load", data_BM: json_BM });

    if (__int_tid_CurTab != null) {
      var tid_CurTab = __int_tid_CurTab;
      __int_tid_CurTab = null;
      chrome.tabs.remove(tid_CurTab);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var btn_Tmp1;

  __int_tid_CurTab = null;
  chrome.tabs.getCurrent(function(tabCur) {
    if (tabCur && tabCur.id) {
      __int_tid_CurTab = tabCur.id;
    }
  });

  btn_Tmp1 = document.getElementById(__str_uid_InputFile);
  if (btn_Tmp1) {
    btn_Tmp1.addEventListener('change', __jui_BMs_Load);
  }
});

