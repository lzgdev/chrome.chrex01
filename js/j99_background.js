// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var   gstr_ID_BMb = "1";

function bmut_Clean() {
  console.log("bmut_Clean: ....");
  chrome.bookmarks.getSubTree(gstr_ID_BMb, function(bms_Trees) {
    var bms_Tree = (bms_Trees && (bms_Trees.length == 1)) ? bms_Trees[0] : null;
    var bms_Childs = (bms_Tree != null && bms_Tree.children) ? bms_Tree.children : null;
    for (var c=0; bms_Childs != null && c < bms_Childs.length; c++) {
      var bms_Child = bms_Childs[c];
      console.log("bmut_Clean(try): id=", bms_Child.id, "title=", bms_Child.title);
      chrome.bookmarks.removeTree(bms_Child.id, function(bms_Dels) {
        for (var d=0; bms_Dels && d < bms_Dels.length; d++) {
          console.log("bmut_Clean(del): id=", bms_Dels[d].id, "title=", bms_Dels[d].title);
        }
      });
    }
  });
}

function bmut_Save(name_BM) {
  console.log("bmut_Save: ....");
  chrome.bookmarks.getSubTree(gstr_ID_BMb, function(bms_Trees) {
    var bms_Tree = (bms_Trees && (bms_Trees.length == 1)) ? bms_Trees[0] : null;
    var blob = new Blob([JSON.stringify(bms_Tree, null, 2)], {type : 'application/json'});
    saveAs(blob, name_BM);
  });
}

/*
 * bmut_Load(json_BM) implementation: begin
 * */
function __load_BM(json_BM, bm_p_ID)
{
  var str_id  = json_BM['id'];
  var int_id  = parseInt(str_id);
  var str_title = json_BM.hasOwnProperty('title') ? json_BM['title'] : null;
  var str_url = json_BM.hasOwnProperty('url') ? json_BM['url'] : null;
  console.log("load_BM(old): id=", str_id, "title=", str_title, "url=", str_url);
  if (str_title != null && str_url != null && !json_BM.hasOwnProperty('children') &&
      int_id >  1)
  {
    chrome.bookmarks.create({ 'parentId': bm_p_ID,
                              'title': str_title,
                              'url': str_url
                             },
                            function(newPage) {
        console.log("load_BM(new,page): id=", newPage.id, "title=", newPage.title);
      });
  }
  if (str_title != null && str_url == null && json_BM.hasOwnProperty('children'))
  {
    var child_BMs = json_BM['children'];
    if (int_id <= 1) {
      __load_BMs(child_BMs, str_id);
    }
    else {
      chrome.bookmarks.create({ 'parentId': bm_p_ID,
                              'title': str_title
                            },
                            function(newFolder) {
        console.log("load_BM(new, dir): id=", newFolder.id, "title=" + newFolder.title);
        __load_BMs(child_BMs, newFolder.id);
      });
    }
  }
}

function __load_BMs(json_BMs, bm_p_ID)
{
  for (var i=0; i < json_BMs.length; i++)
  {
    console.log("load_BMs: ", i);
    __load_BM(json_BMs[i], bm_p_ID);
  }
}

function bmut_Load(json_BM)
{
  __load_BM(json_BM, gstr_ID_BMb);
}
/*
 * bmut_Load(json_BM) implementation: end
 * */

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse){
    if (request.msg == "BMs_Clean") {
      bmut_Clean();
    }
    else
    if (request.msg == "BMs_Save") {
      bmut_Save(request.name_BM);
    }
    else
    if (request.msg == "BMs_Load") {
      bmut_Load(request.data_BM);
    }
  }
);

