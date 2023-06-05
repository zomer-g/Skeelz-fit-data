function onFileUpload(e) {
  var folderId = "11yIcQMaHsYkZwq1ouQUPeC4756o1eYnH";
  var sheetId = "190h_pLSlHFoBvShxH8uorwsEiJGvqwjgW6-rzqh8UEg";
  
  var folder = DriveApp.getFolderById(folderId);
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Sheet1");
  
  var files = folder.getFilesByType(MimeType.CSV);
  
  while (files.hasNext()) {
    var file = files.next();
    var fileId = file.getId();
    
    var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
    sheet.clearContents();
    sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
    
    DriveApp.getFileById(fileId).setTrashed(true);
  }
}
