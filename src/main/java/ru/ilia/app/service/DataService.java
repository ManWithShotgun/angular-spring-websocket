package ru.ilia.app.service;

import java.util.Map;

public interface DataService {

    String getResult(final String ksi, final String mass);

    Map<String, String> getAllResults(final String ksi);
}
