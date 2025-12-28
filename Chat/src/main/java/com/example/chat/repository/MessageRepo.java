package com.example.chat.repository;

//import com.example.chat.model.Message;
import com.example.chat.model.Message_;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message_,Long> {
    @Query("Select m from Message_ m where (m.sender=:user1 and m.receiver=:user2) or (m.sender=:user2 and m.receiver=:user1) order by m.timeStamp")
    public List<Message_> getMessages(@Param("user1") String user1, @Param("user2") String user2);
}
