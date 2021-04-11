package com.example.wbdvsp2102xingboliuserverjava.services;

import com.example.wbdvsp2102xingboliuserverjava.models.Widget;
import com.example.wbdvsp2102xingboliuserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;


    private List<Widget> widgets = new ArrayList<>();

    public Widget createWidget(String tid, Widget widget) {
        widget.setTopicId(tid);
        
        return repository.save(widget);
    }

    public List<Widget> findWidgetsForTopic(String tid) {
        return repository.findWidgetsForTopic(tid);
    }

    public int updateWidget(Long wid, Widget widget) {
        Widget originalWidget = repository.findById(wid).get();

        originalWidget.setText(widget.getText());
        originalWidget.setType(widget.getType());
        originalWidget.setOrdered(widget.getOrdered());
        originalWidget.setSrc(widget.getSrc());
        originalWidget.setWidth(widget.getWidth());
        originalWidget.setHeight(widget.getHeight());


        repository.save(originalWidget);

        return 1;
    }

    public int deleteWidget(Long wid){
        repository.deleteById(wid);

        return 1;
    }
}
