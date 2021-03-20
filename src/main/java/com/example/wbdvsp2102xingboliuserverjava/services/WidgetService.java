package com.example.wbdvsp2102xingboliuserverjava.services;

import com.example.wbdvsp2102xingboliuserverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
    private List<Widget> widgets = new ArrayList<>();

    public Widget createWidget(String tid, Widget widget) {
        widget.setTopicId(tid);
        widget.setId((new Date()).getTime());
        widgets.add(widget);
        return widget;
    }

    public List<Widget> findWidgetsForTopic(String tid) {
        List<Widget> ws = new ArrayList<>();
        for(Widget w: widgets) {
            if (w.getTopicId().equals(tid)){
                ws.add(w);
            }
        }
        return ws;
    }

    public int updateWidget(Long wid, Widget widget) {
        for (int i = 0; i < widgets.size(); i++) {
            if (widgets.get(i).getId().equals(wid)) {
                widgets.set(i, widget);
                return 1;
            }
        }
        return 0;
    }

    public int deleteWidget(Long wid){
        for (int i = 0; i < widgets.size(); i++) {
            if (widgets.get(i).getId().equals(wid)) {
                widgets.remove(i);
                return 1;
            }
        }
        return 0;
    }
}
