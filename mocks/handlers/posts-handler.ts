import { rest } from 'msw';

import { API_ENDPOINT } from '../../configs';

import type { Post, User } from '../../types';

const users: User[] = [
  {
    id: '26ebf51d-42de-4dbe-98e1-815757218b6e',
    name: 'Robert C. Nichols',
    avatar_url:
      'https://i.pravatar.cc/64?u=26ebf51d-42de-4dbe-98e1-815757218b6e',
  },
  {
    id: '99844222-e919-4d1d-bfdb-bd6433a20372',
    name: 'Janet D. Leal',
    avatar_url:
      'https://i.pravatar.cc/64?u=99844222-e919-4d1d-bfdb-bd6433a20372',
  },
  {
    id: '2a28c1c0-0b97-4753-9213-f9fa344852cc',
    name: 'Denise M. Berg',
    avatar_url:
      'https://i.pravatar.cc/64?u=2a28c1c0-0b97-4753-9213-f9fa344852cc',
  },
  {
    id: 'b5a1d5c7-38ee-4009-9ce5-74083fe127f1',
    name: 'Tony E. Ross',
    avatar_url:
      'https://i.pravatar.cc/64?u=b5a1d5c7-38ee-4009-9ce5-74083fe127f1',
  },
  {
    id: 'c8ceaf98-c3b2-4efc-9198-a8aa3e18f37d',
    name: 'Nancy D. Holt',
    avatar_url:
      'https://i.pravatar.cc/64?u=c8ceaf98-c3b2-4efc-9198-a8aa3e18f37d',
  },
  {
    id: 'ad123a43-28cb-4242-a94a-cb9330ec6dd7',
    name: 'Jazmin J. Roland',
    avatar_url:
      'https://i.pravatar.cc/64?u=ad123a43-28cb-4242-a94a-cb9330ec6dd7',
  },
  {
    id: 'd080e315-2ec2-4d2c-aba5-415a87b6e1fe',
    name: 'Allen J. Cox',
    avatar_url:
      'https://i.pravatar.cc/64?u=d080e315-2ec2-4d2c-aba5-415a87b6e1fe',
  },
  {
    id: '598367bf-b5a6-40b1-a61a-d31f608479f0',
    name: 'Donna G. Hunter',
    avatar_url:
      'https://i.pravatar.cc/64?u=598367bf-b5a6-40b1-a61a-d31f608479f0',
  },
  {
    id: 'a6e20ef9-6987-48b2-9f39-7a1397026936',
    name: 'Fernando G. Edmondson',
    avatar_url:
      'https://i.pravatar.cc/64?u=a6e20ef9-6987-48b2-9f39-7a1397026936',
  },
  {
    id: '73cc8d50-11a2-4e90-9b79-8e3e2802e83d',
    name: 'Mckenzie E. Wilson',
    avatar_url:
      'https://i.pravatar.cc/64?u=73cc8d50-11a2-4e90-9b79-8e3e2802e83d',
  },
];

const posts: Post[] = [
  {
    attachments: [
      {
        height: 450,
        type: 'photo',
        url: 'https://picsum.photos/seed/picsum/800/450',
        width: 800,
        alt_text: 'an example of image',
        id: 'da1a582f-9cde-45da-8a16-ddf176ce7ed0',
        preview_image_url: 'https://picsum.photos/seed/picsum/800/450',
        blur_data_url:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAEtGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjEwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNSIKICAgZXhpZjpDb2xvclNwYWNlPSI2NTUzNSIKICAgdGlmZjpJbWFnZVdpZHRoPSIxMCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNSIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iOTYvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iOTYvMSIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkdlbmVyaWMgUkdCIFByb2ZpbGUiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIy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',
      },
      {
        height: 960,
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1563012678-bdfec255931b',
        width: 1280,
        alt_text: 'potatoes',
        id: '38f159ee-ba59-4f50-b3b3-8052d55825ca',
        preview_image_url:
          'https://images.unsplash.com/photo-1563012678-bdfec255931b',
        blur_data_url:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QCgRXhpZgAATU0AKgAAAAgABQEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAEyAAIAAAAUAAAAWodpAAQAAAABAAAAbgAAAAAAAABIAAAAAQAAAEgAAAABMjAyMjowODowOCAwODowNjowNwAAA6ABAAMAAAAB//8AAKACAAMAAAABAAoAAKADAAMAAAABAAcAAAAAAAD/4QsyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjUuMCI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9ImMyIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wOC0wOFQwODowNjowNyswOTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wOC0wOFQwODowNjowNyswOTowMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InByb2R1Y2VkIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZmZpbml0eSBQaG90byAxLjEwLjUiIHN0RXZ0OndoZW49IjIwMjItMDgtMDhUMDg6MDY6MDcrMDk6MDAiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7QAsUGhvdG9zaG9wIDMuMAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+ICIElDQ19QUk9GSUxFAAEBAAACEGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKZGVzYwAAAPwAAABkY3BydAAAAWAAAAALd3RwdAAAAWwAAAAUYmtwdAAAAYAAAAAUclhZWgAAAZQAAAAUZ1hZWgAAAagAAAAUYlhZWgAAAbwAAAAUclRSQwAAAdAAAABAZ1RSQwAAAdAAAABAYlRSQwAAAdAAAABAZGVzYwAAAAAAAAADYzIAAAAAAAAAAAMAYwAyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRleHQAAAAASVgAAFhZWiAAAAAAAAD21gABAAAAANMtWFlaIAAAAAAAAAMWAAADMwAAAqRYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9jdXJ2AAAAAAAAABoAAADLAckDYwWSCGsL9hA/FVEbNCHxKZAyGDuSRgVRd13ta3B6BYmxmnysab9908PpMP///9sAQwACAgICAgECAgICAwICAwMGBAMDAwMHBQUEBggHCQgIBwgICQoNCwkKDAoICAsPCwwNDg4PDgkLEBEQDhENDg4O/9sAQwECAwMDAwMHBAQHDgkICQ4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4O/8AAEQgABwAKAwERAAIRAQMRAf/EABUAAQEAAAAAAAAAAAAAAAAAAAYH/8QAIhAAAgECBQUAAAAAAAAAAAAAAQIDBBEFBhITIQAVIjFz/8QAFgEBAQEAAAAAAAAAAAAAAAAABAUG/8QAHREAAQQDAQEAAAAAAAAAAAAAAQACAxESIfBxgf/aAAwDAQACEQMRAD8AhO1UQZrpTh7thkkFLPOzI4O4lvMqpBVS5JAJGoaV9C1s5HMxrTlu6CuzQSOeMNEAnvU2izTQPTRv3KZtSg3NOnPHy6XlWqQKB2XHvi//2Q==',
      },
      {
        height: 1280,
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1604300721398-3f58fdf81780',
        width: 853,
        alt_text: 'potatoes',
        id: '161610d0-34c1-49d4-85a4-6255126f7eac',
        preview_image_url:
          'https://images.unsplash.com/photo-1604300721398-3f58fdf81780',
        blur_data_url:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QCgRXhpZgAATU0AKgAAAAgABQEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAEyAAIAAAAUAAAAWodpAAQAAAABAAAAbgAAAAAAAABIAAAAAQAAAEgAAAABMjAyMjowODowOCAwODowOTowMAAAA6ABAAMAAAAB//8AAKACAAMAAAABAAYAAKADAAMAAAABAAoAAAAAAAD/4QspaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjUuMCI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9ImMyIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wOC0wOFQwODowOSswOTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wOC0wOFQwODowOSswOTowMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InByb2R1Y2VkIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZmZpbml0eSBQaG90byAxLjEwLjUiIHN0RXZ0OndoZW49IjIwMjItMDgtMDhUMDg6MDkrMDk6MDAiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7QAsUGhvdG9zaG9wIDMuMAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+ICIElDQ19QUk9GSUxFAAEBAAACEGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKZGVzYwAAAPwAAABkY3BydAAAAWAAAAALd3RwdAAAAWwAAAAUYmtwdAAAAYAAAAAUclhZWgAAAZQAAAAUZ1hZWgAAAagAAAAUYlhZWgAAAbwAAAAUclRSQwAAAdAAAABAZ1RSQwAAAdAAAABAYlRSQwAAAdAAAABAZGVzYwAAAAAAAAADYzIAAAAAAAAAAAMAYwAyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRleHQAAAAASVgAAFhZWiAAAAAAAAD21gABAAAAANMtWFlaIAAAAAAAAAMWAAADMwAAAqRYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9jdXJ2AAAAAAAAABoAAADLAckDYwWSCGsL9hA/FVEbNCHxKZAyGDuSRgVRd13ta3B6BYmxmnysab9908PpMP///9sAQwACAgICAgECAgICAwICAwMGBAMDAwMHBQUEBggHCQgIBwgICQoNCwkKDAoICAsPCwwNDg4PDgkLEBEQDhENDg4O/9sAQwECAwMDAwMHBAQHDgkICQ4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4O/8AAEQgACgAGAwERAAIRAQMRAf/EABUAAQEAAAAAAAAAAAAAAAAAAAUG/8QAIRAAAgIBAwUBAAAAAAAAAAAAAQIDBBEGEiEABRMUIjH/xAAVAQEBAAAAAAAAAAAAAAAAAAAGB//EACQRAAEDAwIHAQAAAAAAAAAAAAECAxEABAUG8BIhMUJScaHB/9oADAMBAAIRAxEAPwBTsNChR04knp1dPh0jDUrdmW1Hu+xvUyR5UkKCQSTljz+gRO71AjIOld40VHrIIEk7+UrY0g9ixw4Z8ISe1QkCPEj9n3UtBYsT6dQzzyTFpMt5HLZI3AHnozkAA/A3zNOcGpSrIEncCv/Z',
      },
      {
        height: 1280,
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1610631087218-f784839e48f1',
        width: 854,
        alt_text: 'potatoes',
        id: '5da51d51-4252-4224-a554-4c2d6926d904',
        preview_image_url:
          'https://images.unsplash.com/photo-1610631087218-f784839e48f1',
        blur_data_url:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QCgRXhpZgAATU0AKgAAAAgABQEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAEyAAIAAAAUAAAAWodpAAQAAAABAAAAbgAAAAAAAABIAAAAAQAAAEgAAAABMjAyMjowODowOCAwODoxNDoxNQAAA6ABAAMAAAAB//8AAKACAAMAAAABAAYAAKADAAMAAAABAAoAAAAAAAD/4QsyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjUuMCI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9ImMyIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wOC0wOFQwODoxNDoxNSswOTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wOC0wOFQwODoxNDoxNSswOTowMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InByb2R1Y2VkIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZmZpbml0eSBQaG90byAxLjEwLjUiIHN0RXZ0OndoZW49IjIwMjItMDgtMDhUMDg6MTQ6MTUrMDk6MDAiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7QAsUGhvdG9zaG9wIDMuMAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+ICIElDQ19QUk9GSUxFAAEBAAACEGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKZGVzYwAAAPwAAABkY3BydAAAAWAAAAALd3RwdAAAAWwAAAAUYmtwdAAAAYAAAAAUclhZWgAAAZQAAAAUZ1hZWgAAAagAAAAUYlhZWgAAAbwAAAAUclRSQwAAAdAAAABAZ1RSQwAAAdAAAABAYlRSQwAAAdAAAABAZGVzYwAAAAAAAAADYzIAAAAAAAAAAAMAYwAyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRleHQAAAAASVgAAFhZWiAAAAAAAAD21gABAAAAANMtWFlaIAAAAAAAAAMWAAADMwAAAqRYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9jdXJ2AAAAAAAAABoAAADLAckDYwWSCGsL9hA/FVEbNCHxKZAyGDuSRgVRd13ta3B6BYmxmnysab9908PpMP///9sAQwACAgICAgECAgICAwICAwMGBAMDAwMHBQUEBggHCQgIBwgICQoNCwkKDAoICAsPCwwNDg4PDgkLEBEQDhENDg4O/9sAQwECAwMDAwMHBAQHDgkICQ4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4O/8AAEQgACgAGAwERAAIRAQMRAf/EABUAAQEAAAAAAAAAAAAAAAAAAAYH/8QAIxAAAwACAQEJAAAAAAAAAAAAAQIDBAUhCAAGERITFCJRUv/EABUBAQEAAAAAAAAAAAAAAAAAAAYH/8QAJBEBAAAFAwMFAAAAAAAAAAAAAQACAxEhMUFhBAVRBhITFPD/2gAMAwEAAhEDEQA/ALB007jLy77uGRvdkYe2j69r2cynZJRQo1ioDUJL8K3Kz8xHi3xJdgKvzVRmWXdd5uL8aceS0LvU31p+mo1qMgLoCXtbNw8OHGHGNIedPWNj4m37yJiwnjIK2YLJAgBfIZnPH6bk/Z57Ie3B7n9vE96ieeYBWP/Z',
      },
    ],
    author: users[0],
    created_at: '2022-08-07T20:01:12.715Z',
    id: 'e6b6dce6-49fa-490c-88e3-855d0ea3d72b',
    text: 'The potato was the first domesticated vegetable in the region of modern-day southern Peru and extreme northwestern Bolivia between 8000 and 5000 BCE. Cultivation of potatoes in South America may go back 10,000 years, but tubers do not preserve well in the archaeological record, making identification difficult. The earliest archaeologically verified potato tuber remains have been found at the coastal site of Ancón (central Peru), dating to 2500 BC. Aside from actual remains, the potato is also found in the Peruvian archaeological record as a design influence of ceramic pottery, often in the shape of vessels. The potato has since spread around the world and has become a staple crop in most countries. ',
    replies: [
      {
        author: users[0],
        created_at: '2022-08-07T20:10:12.715Z',
        id: '65d718b0-3f3f-457e-ac75-0556df9f716c',
        text: 'It arrived in Europe sometime before the end of the 16th century by two different ports of entry: the first in Spain around 1570, and the second via the British Isles between 1588 and 1593. The first written mention of the potato is a receipt for delivery dated 28 November 1567 between Las Palmas de Gran Canaria and Antwerp. In France, at the end of the 16th century, the potato had been introduced to the Franche-Comté, the Vosges of Lorraine and Alsace. By the end of the 18th century it was written in the 1785 edition of Bon Jardinier: "There is no vegetable about which so much has been written and so much enthusiasm has been shown ... The poor should be quite content with this foodstuff." It had widely replaced the turnip and rutabaga by the 19th century. Throughout Europe, the most important new food in the 19th century was the potato, which had three major advantages over other foods for the consumer: its lower rate of spoilage, its bulk (which easily satisfied hunger) and its cheapness. The crop slowly spread across Europe, becoming a major staple by mid-century, especially in Ireland.',
      },
      {
        author: users[0],
        created_at: '2022-08-07T20:20:12.715Z',
        id: '65d718b0-3f3f-457e-ac75-0556df9f716c',
        text: 'Early history: Western South America\nArchaeology of the Potato\nThe earliest archaeologically verified potato tuber remains were found at the coastal site of Ancón (central Peru), dating to 2500 BC. There is also recent evidence from stone tools of potatoes suggesting evidence of potatoes existing as far back as 3400 BC. However, it is difficult to be certain as potatoes do not preserve well compared to other crops. Potatoes dating to about 2000 BC were also found at Huaynuma, in the Casma Valley of Peru, and early potatoes dating to 800-500 BC were also uncovered at the Altiplano site of Chiripa on the east side of Lake Titicaca.\nArcheological evidence also shows that throughout the formative period from 1500 BC to 500 BC and Tiwanaku period in the Andes, potatoes and tubers became increasingly popular as a crop and food. Boiled and steamed potatoes and tubers replaced soups throughout the formative period. From isotopic analysis of human skeletons and archeological reference materials, tubers and potatoes were an integral part of the Andean diet throughout the formative and Tiwanaku periods, alongside the grain quinoa and animals such as llamas. In the Incan period, potato and legume consumption decreased (although still commonly consumed) in favor of crops like maize.\nside from these remains, in the Peruvian archaeological record, the potato was uncovered as a design influence of ceramic pottery in the Altiplanos, often in the shape of vessels. These vessels represented potatoes in three ways: as clear depictions of the vegetable, as embodying a human form (either mutilated or not) or as transition between the two. The fact that the Altiplanos chose to represent the potato in their vessels shows they had great social significance to the people there. Moreover, in Moche culture, potatoes did not have much religion or cultural significance compared to more prominent crops like maize. The protuberant and malformed nature of the potato fascinated the Moche and commonly appeared in their art as malformed animals and humans provoking an emotion known as mundo hororroso. The potato-symbolized art touched on themes such as physical deformities and hallucinations. \n',
      },
      {
        author: users[0],
        created_at: '2022-08-07T20:30:12.715Z',
        id: '65d718b0-3f3f-457e-ac75-0556df9f716c',
        text: 'Uses of the Potatoes in South American Societies\nn the Altiplano, potatoes provided the principal energy source for the Inca Empire, its predecessors, and its Spanish successor. Andean people prepared their potatoes in a variety of ways, such as mashed, baked, boiled, and stewed in ways similar to modern methods. The Andean people also prepared a dish called papas secas, which was a process that involved boiling, peeling, and chopping. These potatoes were then fermented in order to create toqosh: and ground to a pulp, soaked, and filtered into a starch referred to as almidón de papa. However, the cash crop of the Andean people was chuño: created by letting potatoes freeze overnight allowing them to thaw in the morning which they repeated to soften the potatoes. Then, Farmers extracted the potatoes\' water leaving them much lighter and smaller. This new creation was later prepared into a stew (usually an addition). Among its many benefits, Chuño\'s primary benefit was that it could be stored for years without refrigeration, which came into use especially during years of famine or bad harvests. Moreover, this long shelf life allowed it to be the staple food for the Inca Armies due to how well it maintained its flavor and longevity. The Spanish fed chuño to the silver miners who produced vast wealth in the 16th century for the Spanish government.\nPotato was the staple food of most Pre‑Columbian Mapuches, "specially in the southern and coastal Mapuche territories where maize did not reach maturity".\nPotato was cultivated by the Chono tribe in Guaitecas Archipelago in Patagonia being this the southern limit of Pre-Hispanic agriculture as noted by the mention of the cultivation of Chiloé potatoes by a Spanish expedition in 1557.',
      },
    ],
  },
  {
    attachments: [
      {
        alt_text: 'language',
        blur_data_url:
          ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAFjWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNiIKICAgdGlmZjpJbWFnZVdpZHRoPSIxMCIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIvMSIKICAgdGlmZjpZUmVzb2x1dGlvbj0iNzIvMSIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjEwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNiIKICAgZXhpZjpDb2xvclNwYWNlPSI2NTUzNSIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9ImMyIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wOC0wOFQwNzo1NDo1OCswOTowMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wOC0wOFQwNzo1NDo1OCswOTowMCI+CiAgIDx0aWZmOkJpdHNQZXJTYW1wbGU+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpPjg8L3JkZjpsaT4KICAgIDwvcmRmOlNlcT4KICAgPC90aWZmOkJpdHNQZXJTYW1wbGU+CiAgIDx0aWZmOllDYkNyU3ViU2FtcGxpbmc+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpPjI8L3JkZjpsaT4KICAgICA8cmRmOmxpPjI8L3JkZjpsaT4KICAgIDwvcmRmOlNlcT4KICAgPC90aWZmOllDYkNyU3ViU2FtcGxpbmc+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InByb2R1Y2VkIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZmZpbml0eSBQaG90byAxLjEwLjUiCiAgICAgIHN0RXZ0OndoZW49IjIwMjItMDgtMDhUMDc6NTQ6NTgrMDk6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/PlMkIFYAAAEZaUNDUGMyAAAokWNgYBLISc4tZhJgYMjNKykKcndSiIiMUmC/w8DIIMnAzKDJYJmYXFzgGBDgw4ATfLsGVA0El3VBZuFWhxVwpaQWJwPpP0CcklxQVMLAwJgAZHOXlxSA2DlAtkhSNpjdAGIXAR0IZE8BsdMh7BVgNRD2HrCakCBnIPsCkO2QjsROQmJD7QUB5mQjmHOYGZIZjBioBUpSK0pAtGcEAwMoXCGiiPBCiDGLAbExAwPTEoRY/iIGBouvQPEJCLGkmQwM21sZGCRuIcRUFjAw8LcwMGw7n1xaVAa1WgqITzOeZE5mncSRzf1NwF40UNpE8aPmBCMJ60lurIHlsW+zC6pYOzfOqlmTub/28uGXBv//AwBjSVRcU1E72AAAAAlwSFlzAAALEwAACxMBAJqcGAAAAKJJREFUCJkFwVEOgjAMANCuXbvhhkoMJib6x7eX8QRexAMbIxEQCLjV98zjfquONeV0aRoR5zZx7D4+BJIixohFDIQISKsaYF7meV0WNUZB0XkrFstyG6oDGoWcXQjsxbkia9a0ot/V+0tTHs+ftp2Gvus7ZMkA3++YVa0wp986tc95GLxlARzz28WSWBCArqfKsO1fL2I7/xKocUQpJSLLIn9KSEJCKfyiwQAAAABJRU5ErkJggg==',
        type: 'photo',
        height: 853,
        width: 1280,
        id: '45f9e0b3-ca88-47ef-9b00-25216c88c703',
        url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d',
        preview_image_url:
          'https://images.unsplash.com/photo-1457369804613-52c61a468e7d',
      },
    ],
    author: users[1],
    created_at: '2022-08-07T18:21:57.113Z',
    id: '109fd773-8378-4382-9366-1e9dc8396a65',
    text: 'A language is a structured system of communication. The structure of a language is its grammar and the free components are its vocabulary. Languages are the primary means of communication of humans, and can be conveyed through speech (spoken language), sign, or writing. Many languages, including the most widely-spoken ones, have writing systems that enable sounds or signs to be recorded for later reactivation. Human language is unique among the known systems of animal communication in that it is not dependent on a single mode of transmission (sight, sound, etc.), is highly variable between cultures and across time, and affords a much wider range of expression than other systems.',
  },
  {
    author: users[0],
    created_at: '2022-08-06T14:14:21.529Z',
    id: '0135f58f-e960-4afd-8502-52b494a90e0f',
    text: 'This is an example of body text.',
  },
  {
    author: users[2],
    created_at: '2022-08-05T18:54:02.559Z',
    id: '06933f70-ba4b-46e0-91ab-1da49e73fe09',
    text: 'Computer science\nThe branch of computer science known as data structures uses graphs to represent networks of communication, data organization, computational devices, the flow of computation, etc. For instance, the link structure of a website can be represented by a directed graph, in which the vertices represent web pages and directed edges represent links from one page to another. A similar approach can be taken to problems in social media, travel, biology, computer chip design, mapping the progression of neuro-degenerative diseases, and many other fields. The development of algorithms to handle graphs is therefore of major interest in computer science. The transformation of graphs is often formalized and represented by graph rewrite systems. Complementary to graph transformation systems focusing on rule-based in-memory manipulation of graphs are graph databases geared towards transaction-safe, persistent storing and querying of graph-structured data.',
    parent: {
      author: users[2],
      created_at: '2022-08-05T18:51:18.103Z',
      id: '7ca5eef6-06eb-4b9c-a6fe-c9aab86b2e04',
      text: 'Graph theory\nIn mathematics, graph theory is the study of graphs, which are mathematical structures used to model pairwise relations between objects. A graph in this context is made up of vertices (also called nodes or points) which are connected by edges (also called links or lines). A distinction is made between undirected graphs, where edges link two vertices symmetrically, and directed graphs, where edges link two vertices asymmetrically. Graphs are one of the principal objects of study in discrete mathematics.',
    },
    replies: [
      {
        author: users[2],
        created_at: '2022-08-05T18:58:18.103Z',
        id: '',
        text: "Linguistics\nGraph-theoretic methods, in various forms, have proven particularly useful in linguistics, since natural language often lends itself well to discrete structure. Traditionally, syntax and compositional semantics follow tree-based structures, whose expressive power lies in the principle of compositionality, modeled in a hierarchical graph. More contemporary approaches such as head-driven phrase structure grammar model the syntax of natural language using typed feature structures, which are directed acyclic graphs. Within lexical semantics, especially as applied to computers, modeling word meaning is easier when a given word is understood in terms of related words; semantic networks are therefore important in computational linguistics. Still, other methods in phonology (e.g. optimality theory, which uses lattice graphs) and morphology (e.g. finite-state morphology, using finite-state transducers) are common in the analysis of language as a graph. Indeed, the usefulness of this area of mathematics to linguistics has borne organizations such as TextGraphs, as well as various 'Net' projects, such as WordNet, VerbNet, and others.",
      },
      {
        author: users[2],
        created_at: '2022-08-05T19:12:18.103Z',
        id: '',
        text: 'Physics and chemistry\nGraph theory is also used to study molecules in chemistry and physics. In condensed matter physics, the three-dimensional structure of complicated simulated atomic structures can be studied quantitatively by gathering statistics on graph-theoretic properties related to the topology of the atoms. Also, "the Feynman graphs and rules of calculation summarize quantum field theory in a form in close contact with the experimental numbers one wants to understand." In chemistry a graph makes a natural model for a molecule, where vertices represent atoms and edges bonds. This approach is especially used in computer processing of molecular structures, ranging from chemical editors to database searching. In statistical physics, graphs can represent local connections between interacting parts of a system, as well as the dynamics of a physical process on such systems. Similarly, in computational neuroscience graphs can be used to represent functional connections between brain areas that interact to give rise to various cognitive processes, where the vertices represent different areas of the brain and the edges represent the connections between those areas. Graph theory plays an important role in electrical modeling of electrical networks, here, weights are associated with resistance of the wire segments to obtain electrical properties of network structures. Graphs are also used to represent the micro-scale channels of porous media, in which the vertices represent the pores and the edges represent the smaller channels connecting the pores. Chemical graph theory uses the molecular graph as a means to model molecules. Graphs and networks are excellent models to study and understand phase transitions and critical phenomena. Removal of nodes or edges leads to a critical transition where the network breaks into small clusters which is studied as a phase transition. This breakdown is studied via percolation theory.',
      },
      {
        author: users[2],
        created_at: '2022-08-05T19:31:18.103Z',
        id: '',
        text: "Social sciences\nGraph theory is also widely used in sociology as a way, for example, to measure actors' prestige or to explore rumor spreading, notably through the use of social network analysis software. Under the umbrella of social networks are many different types of graphs. Acquaintanceship and friendship graphs describe whether people know each other. Influence graphs model whether certain people can influence the behavior of others. Finally, collaboration graphs model whether two people work together in a particular way, such as acting in a movie together.",
      },
      {
        author: users[2],
        created_at: '2022-08-05T19:45:18.103Z',
        id: '',
        text: "Biology\nLikewise, graph theory is useful in biology and conservation efforts where a vertex can represent regions where certain species exist (or inhabit) and the edges represent migration paths or movement between the regions. This information is important when looking at breeding patterns or tracking the spread of disease, parasites or how changes to the movement can affect other species.\nGraphs are also commonly used in molecular biology and genomics to model and analyse datasets with complex relationships. For example, graph-based methods are often used to 'cluster' cells together into cell-types in single-cell transcriptome analysis. Another use is to model genes or proteins in a pathway and study the relationships between them, such as metabolic pathways and gene regulatory networks. Evolutionary trees, ecological networks, and hierarchical clustering of gene expression patterns are also represented as graph structures.\nGraph theory is also used in connectomics; nervous systems can be seen as a graph, where the nodes are neurons and the edges are the connections between them.",
      },
      {
        author: users[2],
        created_at: '2022-08-05T19:51:18.103Z',
        id: '',
        text: 'Mathematics\nIn mathematics, graphs are useful in geometry and certain parts of topology such as knot theory. Algebraic graph theory has close links with group theory. Algebraic graph theory has been applied to many areas including dynamic systems and complexity. ',
      },
      {
        author: users[2],
        created_at: '2022-08-05T19:58:18.103Z',
        id: '',
        text: "Other topics\nA graph structure can be extended by assigning a weight to each edge of the graph. Graphs with weights, or weighted graphs, are used to represent structures in which pairwise connections have some numerical values. For example, if a graph represents a road network, the weights could represent the length of each road. There may be several weights associated with each edge, including distance (as in the previous example), travel time, or monetary cost. Such weighted graphs are commonly used to program GPS's, and travel-planning search engines that compare flight times and costs.",
      },
    ],
  },
  {
    author: users[3],
    created_at: '2022-08-05T19:56:18.103Z',
    id: 'b48efb0e-c9fc-4551-8396-f44d0b92651e',
    text: 'This is an example of body text.',
  },
  {
    author: users[4],
    created_at: '2022-08-05T19:54:18.103Z',
    id: 'e2b166be-2cd4-4b5d-a976-86ca472b5042',
    text: 'This is an example of body text.',
  },
  {
    author: users[5],
    created_at: '2022-08-05T19:52:18.103Z',
    id: 'f6705554-bb57-4991-b568-08a82462e101',
    text: 'This is an example of body text.',
  },
  {
    author: users[6],
    created_at: '2022-08-05T19:50:18.103Z',
    id: '605a30c6-7194-4800-86d5-e2434ed89e17',
    text: 'This is an example of body text.',
  },
  {
    author: users[7],
    created_at: '2022-08-05T19:48:18.103Z',
    id: 'a43502e8-44b4-4b2f-a8c3-f232147e83d7',
    text: 'This is an example of body text.',
  },
  {
    author: users[8],
    created_at: '2022-08-05T19:46:18.103Z',
    id: '50553f87-c852-4b41-a4f4-6028efb1c417',
    text: 'This is an example of body text.',
  },
  {
    author: users[9],
    created_at: '2022-08-05T19:44:18.103Z',
    id: 'fbeb1e73-b659-45e1-88b2-4d9fec30212f',
    text: 'This is an example of body text.',
  },

  {
    author: users[3],
    created_at: '2022-08-05T19:40:18.103Z',
    id: 'dea0f148-7154-4f04-9c74-646dc4f0882f',
    text: 'This is an example of body text.',
  },
  {
    author: users[4],
    created_at: '2022-08-05T19:30:18.103Z',
    id: '87263dcb-a0c1-403d-a669-aa30e0968d45',
    text: 'This is an example of body text.',
  },
  {
    author: users[5],
    created_at: '2022-08-05T19:20:18.103Z',
    id: '80b606e2-7fdd-4eb0-8912-e09206709c72',
    text: 'This is an example of body text.',
  },
  {
    author: users[6],
    created_at: '2022-08-05T19:10:18.103Z',
    id: 'dc4ffae6-d4fb-4ca6-887d-ed69810e7ed2',
    text: 'This is an example of body text.',
  },
  {
    author: users[7],
    created_at: '2022-08-05T19:00:18.103Z',
    id: '74c6f9ac-8d7e-46e7-a96f-a5dd176440cd',
    text: 'This is an example of body text.',
  },
  {
    author: users[8],
    created_at: '2022-08-05T18:50:18.103Z',
    id: 'cb20ff75-552c-4f27-b3be-0c6620f88425',
    text: 'This is an example of body text.',
  },
  {
    author: users[9],
    created_at: '2022-08-05T18:40:18.103Z',
    id: '84e7df2b-0c3f-4a55-97ea-e4ec4250e6dc',
    text: 'This is an example of body text.',
  },
];

export const postsHandler = rest.get(`${API_ENDPOINT}/posts`, (req, res, ctx) =>
  res(ctx.json({ posts })),
);
