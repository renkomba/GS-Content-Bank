var ss = SpreadsheetApp.getActiveSpreadsheet();
var add = ss.getSheetByName('Add');

// paste levelled questions in question box in sheet
function generateQuestions() {
  let questionBox = add.getRange('C25');
  let questions = levelQuestions();
  questions = questions.toString();
  questionBox.setValue(questions);
}

// find the appropriate questions for the level
function levelQuestions() {
  let questions = findQuestions();
  let level = add.getRange('I7').getValue();
  let questionSet = '🥰';  // possible feature: generate random emoji
  let intermediate = questions.intermediate;
  
  if (level == 1) questionSet = intermediate.concat(questions.novice);
  if (level <= 3) questionSet = intermediate.concat(questions.advanced);
  if (level == 4) questionSet = questions.advanced;
//   console.log('LEVELLED QUESTIONS: ', questionSet);
  
  return questionSet;
}

// Generate an object of all possible questions
function findQuestions() {
  let listenAns = '[INTERMEDIATE] You are [context]. Listen to the question that' +
    ' [person] is asking you; what is the appropriate response? ' + 'correct_, , , ; ';
  let listenTrans = '[INTERMEDIATE] You are [context]. Listen to the question' +
    ' that [person] is asking you; what does it mean in English?' + 'correct_, , , ; ';
  
  let listenAdv = ['[ADVANCED] What is the message/moral/lesson of the clip? (); ',
                   '[ADVANCED] Who is the intended audience? (); ',
                   '[ADVANCED] Why did ? (); ',
                   '[ADVANCED] In a sentence, how can you summarise this clip? (); ',
                   '[ADVANCED] Which detail happened first? correct_, , , ; ',
                   '[ADVANCED] Which detail was mentioned first? correct_, , , ; ',
                   '[ADVANCED] Which detail happened last? correct_, , , ; ',
                   '[ADVANCED] Which detail was mentioned last? correct_, , , ; ',
                   '[ADVANCED] Which detail was mentioned? correct_, , , ; ',
                   '[ADVANCED] Which detail was NOT mentioned? correct_, , , ; '];
  let listenInt = ['[INTERMEDIATE] In 1-5 words, what is this clip about? (); ',
                   '[INTERMEDIATE] What is this clip describing? (); ',
                   '[INTERMEDIATE] Which picture matches what the clip is describing?; ',
                   '[INTERMEDIATE] What is the purpose of this clip? correct_, , , ; ',
                   listenAns, listenTrans];
  let listenNovWords = '[NOVICE] Which 10 word did you recognize in the text/' +
    'clip (write them in [LANGUAGE] and English)? (varies); ';
  let listenNov = [listenNovWords, '[NOVICE] How many ? correct_, , , ; ',
                   '[NOVICE] What ? correct_, , , ; ',
                   '[NOVICE] Where ? correct_, , , ; ',
                   '[NOVICE] When ? correct_, , , ; ',
                   '[NOVICE] Who ? correct_, , , ; ',
                   '[NOVICE] Which image matches the clip? correct_, , , ; '];
  let readAdv = ['[ADVANCED] What is the message/moral/lesson of the text? (); ',
                 '[ADVANCED] Which of these happened first? correct_, , , ; ',
                 '[ADVANCED] Which of these was mentioned first? correct_, , , ; ',
                 '[ADVANCED] Which of these happened last? correct_, , , ; ',
                 '[ADVANCED] Which of these was mentioned last? correct_, , , ; ',
                 '[ADVANCED] Why did ? (); '];
  let readInt = ['[INTERMEDIATE] In 1-5 words, what is this text about? (); ',
                 '[INTERMEDIATE] What is this text describing? (); ',
                 '[INTERMEDIATE] Who wrote this text? (); ',
                 '[INTERMEDIATE] Who is the intended audience? (); ',
                 '[INTERMEDIATE] In a sentence, how can you summarise this text? (); ',
                 '[INTERMEDIATE] Which picture matches what the text is describing?; ',
                 '[INTERMEDIATE] Which sentence is in the text? correct_, , , ; ',
                 '[INTERMEDIATE] Which sentence is NOT in the text? correct_, , , ; ',
                 '[INTERMEDIATE] What is the purpose of this text? correct_, , , ; '];
  let readNov = [listenNovWords, '[NOVICE] How many ? correct_, , , ; ',
                 '[NOVICE] What ? correct_, , , ; ', '[NOVICE] Where ? correct_, , , ; ',
                 '[NOVICE] When ? correct_, , , ; ', '[NOVICE] Who ? correct_, , , ; ',
                 '[NOVICE] What type of text is this? correct_, , , ; '];
  let listeningTexts = ['Script', 'Recording'];
  
  let listening = {advanced: listenAdv, intermediate: listenInt, novice: listenNov};
  let reading = {advanced: readAdv, intermediate: readInt, novice: readNov};
  
  let contentType = add.getRange('C7').getValue();
  let questionSet = {};
  
  if (contentType == 'Text') questionSet = reading;
  if (listeningTexts.includes(contentType)) questionSet = listening;
  
//   console.log('QUESTIONS SET: ', questionSet);
  return questionSet;
}
