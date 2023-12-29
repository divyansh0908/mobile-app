import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import DisplayContribution from '../../../components/DisplayContribution';
import { fetchAllTasks } from '../../AuthScreen/Util';
import Loader from '../../../components/Loader';

const All = () => {
  const [allTask, setAllTask] = useState([]);
  const { loggedInUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      (async () => {
        const token = loggedInUserData?.token;

        const allTasks = await fetchAllTasks(token);
        const idToMatch = loggedInUserData.id;
        const myActiveTask = allTasks.tasks.filter(
          (task) => task.assigneeId === idToMatch,
        );
        setAllTask(myActiveTask);
        setLoading(false);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={styles.profile}>
      {loading ? (
        <Loader />
      ) : (
        <DisplayContribution tasks={allTask} expand={false} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default All;
