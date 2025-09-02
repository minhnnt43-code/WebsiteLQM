/**
 * @OnlyCurrentDoc
 */

const APP_FOLDER_NAME = "MINH MINH NÈ - DASHBOARD";
const TASK_ATTACHMENTS_FOLDER_NAME = "Task Attachments";

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Trang Web Cá Nhân - Lâm Quốc Minh')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

function createCalendarEvent(calendarId, title, startTime, endTime) {
  try {
    const calendar = CalendarApp.getCalendarById(calendarId.trim());
    if (!calendar) {
      throw new Error(`Không tìm thấy lịch với ID: "${calendarId}".`);
    }
    const event = calendar.createEvent(title, new Date(startTime), new Date(endTime));
    if (event) {
      return `Đã thêm sự kiện "${title}" vào lịch thành công!`;
    } else {
      throw new Error('Không thể tạo sự kiện. Google Calendar không phản hồi.');
    }
  } catch (e) {
    console.error(`Lỗi trong createCalendarEvent: ${e.stack}`);
    return `Đã xảy ra lỗi: ${e.message}`;
  }
}

function getUserData() {
  try {
    const properties = PropertiesService.getScriptProperties();
    let data = properties.getProperty('minhWebApp_data');
    let parsedData;

    if (data) {
      parsedData = JSON.parse(data);
    } else {
      parsedData = {
        tasks: [{id: 1, text: "Nộp bài tập lớn môn Luật Hiến pháp", category: 'hoctap', priority: 'high', startDateTime: '2025-09-10T09:00', endDateTime: '2025-09-10T11:00', completed: false}],
        messages: []
      };
    }
    
    if (typeof parsedData.calendarId === 'undefined' || parsedData.calendarId === '') {
        parsedData.calendarId = "lqm186005@gmail.com";
    }

    const dataString = JSON.stringify(parsedData);
    if (data !== dataString) {
      properties.setProperty('minhWebApp_data', dataString);
    }
    return dataString;

  } catch (e) {
    console.error("Error in getUserData: " + e.toString());
    return JSON.stringify({ tasks: [], messages: [], calendarId: "lqm186005@gmail.com" });
  }
}

function saveUserData(data) {
  try {
    const properties = PropertiesService.getScriptProperties();
    properties.setProperty('minhWebApp_data', data);
  } catch (e) {
    console.error("Error in saveUserData: " + e.toString());
  }
}

function getOrCreateFolder(name, parent = null) {
    const parentFolder = parent || DriveApp;
    const folders = parentFolder.getFoldersByName(name);
    if (folders.hasNext()) {
        return folders.next();
    }
    return parentFolder.createFolder(name);
}

function uploadFileForTask(fileData, taskId) {
  try {
    const { fileName, mimeType, data } = fileData;
    const appFolder = getOrCreateFolder(APP_FOLDER_NAME);
    const attachmentsFolder = getOrCreateFolder(TASK_ATTACHMENTS_FOLDER_NAME, appFolder);
    const taskFolder = getOrCreateFolder(String(taskId), attachmentsFolder);
    const decodedData = Utilities.base64Decode(data);
    const blob = Utilities.newBlob(decodedData, mimeType, fileName);
    taskFolder.createFile(blob);
    return `Đã đính kèm tệp "${fileName}" thành công!`;
  } catch (e) {
    console.error(`Lỗi trong uploadFileForTask: ${e.stack}`);
    throw new Error(`Đã xảy ra lỗi khi tải tệp lên: ${e.message}`);
  }
}

function getFilesForTask(taskId) {
  try {
    const appFolder = getOrCreateFolder(APP_FOLDER_NAME);
    const attachmentsFolder = getOrCreateFolder(TASK_ATTACHMENTS_FOLDER_NAME, appFolder);
    const taskFolders = attachmentsFolder.getFoldersByName(String(taskId));
    if (!taskFolders.hasNext()) return "[]";
    const taskFolder = taskFolders.next();
    const fileList = [];
    const files = taskFolder.getFiles();
    while (files.hasNext()) {
      const file = files.next();
      fileList.push({ id: file.getId(), name: file.getName(), url: file.getUrl() });
    }
    return JSON.stringify(fileList);
  } catch (e) {
    console.error("Error in getFilesForTask: " + e.toString());
    return "[]";
  }
}

function deleteDriveFile(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    const fileName = file.getName();
    file.setTrashed(true);
    return `Đã xóa tệp "${fileName}" thành công.`;
  } catch (e) {
    console.error("Error in deleteDriveFile: " + e.toString());
    throw new Error(`Đã xảy ra lỗi khi xóa tệp: ${e.message}`);
  }
}

function listAllTaskAttachments() {
  try {
    const appFolder = getOrCreateFolder(APP_FOLDER_NAME);
    const attachmentsFolder = getOrCreateFolder(TASK_ATTACHMENTS_FOLDER_NAME, appFolder);
    const taskFolders = attachmentsFolder.getFolders();
    const allAttachments = [];
    while (taskFolders.hasNext()) {
      const taskFolder = taskFolders.next();
      const taskId = taskFolder.getName();
      const files = taskFolder.getFiles();
      const fileList = [];
      while (files.hasNext()) {
        const file = files.next();
        fileList.push({ id: file.getId(), name: file.getName(), url: file.getUrl() });
      }
      if (fileList.length > 0) {
        allAttachments.push({ taskId: taskId, files: fileList });
      }
    }
    return JSON.stringify(allAttachments);
  } catch (e) {
    console.error("Error in listAllTaskAttachments: " + e.toString());
    return "[]";
  }
}

function deleteTaskAttachmentFolder(taskId) {
  try {
    const appFolder = getOrCreateFolder(APP_FOLDER_NAME);
    const attachmentsFolder = getOrCreateFolder(TASK_ATTACHMENTS_FOLDER_NAME, appFolder);
    const taskFolders = attachmentsFolder.getFoldersByName(String(taskId));
    if (taskFolders.hasNext()) {
      const taskFolder = taskFolders.next();
      taskFolder.setTrashed(true);
    }
  } catch (e) {
    console.error(`Lỗi khi xóa thư mục cho task ${taskId}: ${e.toString()}`);
  }
}
