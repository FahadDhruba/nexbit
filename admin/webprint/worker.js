onmessage = (e) => {

  console.log("Message received from main script");
  
  function generatesetId() {
          const characters = 'ABCDEF';
          let setId = '';

          for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            setId += characters.charAt(randomIndex);
          }

          return setId;
        };
        
  
  const quesRoomData = e.data;
  
  let examName = quesRoomData.details.examName;

  let sub = quesRoomData.details.sub;
  let paper = quesRoomData.details.paper;
  let chapter = quesRoomData.details.chapter;
  
  let counterMCQ = 0;
  for (let y in quesRoomData.mcq) {
    counterMCQ += 1;
  }

  let counterCQ = 0;
  for (let y in quesRoomData.cq) {
    counterCQ += 1;
  }

  let mcqTime = (quesRoomData.details.pMCQtime * counterMCQ) / 60;
  let mcqNum = quesRoomData.details.pMCQnum * counterMCQ;
  let cqTime = quesRoomData.details.pCQtime * counterCQ;
  let cqNum = quesRoomData.details.pCQnum * counterCQ;
  
  let setId = generatesetId();

  let MCQquesContent = '';
  let counter = 1;
  let shorterArray = [];
  let ansArray = [];
  let shorterArrayshuffled;
  
  
  if (quesRoomData.mcq === null) {

  } else {
    for (let x in quesRoomData.mcq) {
      // Accessing data for a specific entry
      shorterArray.push(x)
    }

    shorterArrayshuffled = shorterArray.sort((a, b) => 0.5 - Math.random());
    let shorterArrayLen = shorterArray.length;

    for (let i = 0; i < shorterArrayLen; i++) {
      // Accessing data for a specific entry
      const entryKey = shorterArrayshuffled[i];

      const entry = quesRoomData.mcq[entryKey];

      // Gather all Data into variables

      const ans = entry.ans;

      ansArray.push(ans)

      /*
      const optA = entry.optA;
      const optB = entry.optB;
      const optC = entry.optC;
      const optD = entry.optD;
      */

      const [optA, optB, optC, optD] = entry.ansArr;

      
      const ansCol = entry.ansCol;


      const quesContent = entry.quesContent;
      const quesTitle = entry.quesTitle;

      const quesNumber = counter;

      counter += 1;

      MCQquesContent += `<div id="quesDiv" class="flex gap-4 font-semibold"> <div id="quesNumber" class="flex-none w-5">${quesNumber}.</div> <div id="quesHolder" class="grow text-justify">${quesContent}</div> </div> <div class="grid grid-cols-${ansCol}"> <div id="optDiv" class="flex gap-2 pl-10"> <!-- <span id="optNumber" class="inline-flex items-center justify-center border border-gray-900 w-3 h-3 p-2 text-md font-medium rounded-full">b</span> --> <span id="optNumber" class="flex-none w-3">a.</span> <div id="optHolder" class="grow text-justify">${optA}</div> </div> <div id="optDiv" class="flex gap-2 pl-10"> <!-- <span id="optNumber" class="inline-flex items-center justify-center border border-gray-900 w-3 h-3 p-2 text-md font-medium rounded-full">b</span> --> <span id="optNumber" class="flex-none w-3">b.</span> <div id="optHolder" class="grow text-justify">${optB}</div> </div> <div id="optDiv" class="flex gap-2 pl-10"> <!-- <span id="optNumber" class="inline-flex items-center justify-center border border-gray-900 w-3 h-3 p-2 text-md font-medium rounded-full">b</span> --> <span id="optNumber" class="flex-none w-3">c.</span> <div id="optHolder" class="grow text-justify">${optC}</div> </div> <div id="optDiv" class="flex gap-2 pl-10"> <!-- <span id="optNumber" class="inline-flex items-center justify-center border border-gray-900 w-3 h-3 p-2 text-md font-medium rounded-full">b</span> --> <span id="optNumber" class="flex-none w-3">d.</span> <div id="optHolder" class="grow text-justify">${optD}</div> </div> </div>`;//gap-1 grid grid-cols-2
    }


    //setInputToDB(setId, shorterArrayshuffled.toString(), ansArray.toString(), examId);
  }


              let CQquesContent = '';


              if (quesRoomData.cq === null) {

              } else {
                let counterCQ = 1;

                for (let z in quesRoomData.cq) {
                  // Accessing data for a specific entry
                  const entryc = quesRoomData.cq[z]

                  const CqQues = entryc.CqQues;

                  const CqQuesA = entryc.CqQuesA;
                  const CqQuesB = entryc.CqQuesB;
                  const CqQuesC = entryc.CqQuesC;
                  const CqQuesD = entryc.CqQuesD;

                  const CQquesNumber = counterCQ;

                  counterCQ += 1;

                  CQquesContent += `<div id="CQquesDiv" class="flex gap-5 font-medium"> <div id="CQquesNumber" class="flex-none w-5">${CQquesNumber}.</div> <div id="CQquesHolder" class="grow text-justify font-semibold">${CqQues}</div> </div> <div> <div id="optDiv" class="flex gap-2 pl-10"> <!-- <span id="optNumber" class="inline-flex items-center justify-center border border-gray-900 w-3 h-3 p-2 text-md font-medium rounded-full">b</span> --> <span id="optNumber" class="flex-none w-5 h-5">ক.</span> <div id="optHolder" class="grow text-justify">${CqQuesA}</div> </div> <div id="optDiv" class="flex gap-2 pl-10"> <!-- <span id="optNumber" class="inline-flex items-center justify-center border border-gray-900 w-3 h-3 p-2 text-md font-medium rounded-full">b</span> --> <span id="optNumber" class="flex-none w-5 h-5">খ.</span> <div id="optHolder" class="grow text-justify">${CqQuesB}</div> </div> <div id="optDiv" class="flex gap-2 pl-10"> <!-- <span id="optNumber" class="inline-flex items-center justify-center border border-gray-900 w-3 h-3 p-2 text-md font-medium rounded-full">b</span> --> <span id="optNumber" class="flex-none w-5 h-5">গ.</span> <div id="optHolder" class="grow text-justify">${CqQuesC}</div> </div> <div id="optDiv" class="flex gap-2 pl-10"> <!-- <span id="optNumber" class="inline-flex items-center justify-center border border-gray-900 w-3 h-3 p-2 text-md font-medium rounded-full">b</span> --> <span id="optNumber" class="flex-none w-5 h-5">ঘ.</span> <div id="optHolder" class="grow text-justify">${CqQuesD}</div> </div> </div>`;
                }
              }


  let innerCONTENT = `<section id="detSection" class="w-full text-center"> <div class="w-full grid grid-cols-3 gap-4"> <div class="px-8 py-4"> <img src="https://nexbit.netlify.app/filesrc/PhysicsLogo.png" class="" alt="logo" /> </div> <div class="col-span-2"> <div class="grid grid-cols-3"> <div id="detExamName" class="col-span-2 mt-2 font-bold text-lg"> ${examName} </div> <div class="row-span-2 text-center mt-2 py-4 text-sm rounded-md border-2 border-gray-500"> Set: <span id="setId" class="font-bold text-blue-800">${setId}</span> <!-- <img class="px-12" src="https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=https://goqr.me/api/" alt=""> --> </div> <div class="text-left pl-1 text-sm"> Subject: <span id="detSub" class="font-semibold italic">${sub}</span> </div> <div class="text-left pl-1 text-sm"> Paper: <span id="detPaper" class="font-semibold italic">${paper}</span> </div> <div class="col-span-2 text-left pl-1 text-sm"> Chapter: <span id="detChapter" class="font-semibold">${chapter}</span> </div> </div> </div> </div> </section> <section class=""> <div class="grid grid-cols-2"> <div class="col-span-2 text-center text-sm"> Part: <span class="font-bold">MCQ</span> </div> <div class="text-left px-4 text-sm"> Time: <span id="MCQtime" class="font-semibold">${mcqTime}</span> Minutes </div> <div class="text-right px-4 text-sm"> Mark: <span id="MCQmark" class="font-semibold">${mcqNum}</span> </div> </div> </section> <section id="quesSection" class="w-full"> <div id="columnHolder" class="gap-5 columns-2 text-xs"> ${MCQquesContent} <hr class="m-2"> <section id="CQquesSectioninfo"> <div class="grid grid-cols-2"> <div class="col-span-2 text-center text-sm"> Part: <span class="font-bold">CQ</span> </div> <div class="text-left px-4 text-sm"> Time: <span id="CQtime" class="font-semibold">${cqTime}</span> Minutes </div> <div class="text-right px-4 text-sm"> Mark: <span id="CQmark" class="font-semibold">${cqNum}</span> </div> </div> </section> <section id="CQquesSection" class="w-full"> <div id="CQquesHolder" class="text-xs"> ${CQquesContent} </div> </section> </div> </section>`;
              


  console.log("Posting message back to main script");
  
  
  postMessage([innerCONTENT, setId, ansArray.toString(), shorterArrayshuffled.toString()]);
};
