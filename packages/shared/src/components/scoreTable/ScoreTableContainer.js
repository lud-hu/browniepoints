import React from "react";
import {
  useFirestoreCollection,
  useFirebaseApp,
  AuthCheck,
  useUser
} from "reactfire";

import "firebase/firestore";
import "firebase/auth";

import ScoreTable from "shared/src/components/scoreTable/ScoreTable";

const ScoreTableContainer = () => {
  const firebaseApp = useFirebaseApp();
  let personsArray = [];
  const user = useUser();
  const userid = user ? user.uid : "0";
  const query = firebaseApp
    .firestore()
    .collection("users")
    .doc(userid)
    .collection("scoreboard")
    .orderBy("score", "desc");
  const persons = useFirestoreCollection(query);
  const uid = window.location.pathname.substr(1)
    ? window.location.pathname.substr(1)
    : "0";
  persons.forEach(doc => personsArray.push(doc.data()));

  return (
    <AuthCheck fallback={<ScoreTable scores={personsArray} withSigninMask />}>
      <ScoreTable scores={personsArray} />
    </AuthCheck>
  );
};

export default ScoreTableContainer;
